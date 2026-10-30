import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { Administrator } from '../models/Administrator.js';
import { AuditLog } from '../models/AuditLog.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Complaint } from '../models/Complaint.js';
import type { IComplaint } from '../models/Complaint.js';
import { Job } from '../models/Job.js';
import { protectAdmin, requireAdminPermission, requireSuperAdmin, type AdminRequest } from '../middleware/adminAuth.js';

const router = express.Router();
const adminLoginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-8', legacyHeaders: false, message: { success: false, message: 'कई लॉगिन प्रयास हुए। कुछ देर बाद फिर प्रयास करें।' } });

router.post('/login', adminLoginLimiter, async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const admin = await Administrator.findOne({ email }).select('+password');
    if (!admin || !admin.isActive || !(await bcrypt.compare(password, admin.password)))
      return res.status(401).json({ success: false, message: 'गलत ईमेल या पासवर्ड' });
    const token = jwt.sign({ id: admin._id, kind: 'admin' }, process.env.JWT_SECRET as string, { expiresIn: '8h' });
    await AuditLog.create({ actor: admin._id, actorEmail: admin.email, action: 'admin.login', targetType: 'Administrator' });
    res.cookie('adminToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', maxAge: 8 * 60 * 60 * 1000 });
    res.json({ success: true, administrator: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, permissions: admin.permissions } });
  } catch (error) { next(error); }
});

router.post('/logout', protectAdmin, async (req: AdminRequest, res) => {
  await AuditLog.create({ actor: req.administrator._id, actorEmail: req.administrator.email, action: 'admin.logout', targetType: 'Administrator' });
  res.clearCookie('adminToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' });
  res.json({ success: true });
});

router.use(protectAdmin);
router.get('/me', (req: AdminRequest, res) => {
  const a = req.administrator;
  res.json({ success: true, administrator: { id: a._id, name: a.name, email: a.email, role: a.role, permissions: a.permissions } });
});

router.get('/dashboard', async (_req, res, next) => {
  try {
    const [users, farmers, students, sellers, products, complaints, pendingComplaints, resolvedComplaints, jobs, activeJobs] = await Promise.all([
      User.countDocuments(), User.countDocuments({ roles: 'Farmer' }), User.countDocuments({ roles: 'Student' }), User.countDocuments({ roles: 'Seller' }),
      Product.countDocuments(), Complaint.countDocuments(), Complaint.countDocuments({ status: 'pending' }), Complaint.countDocuments({ status: 'resolved' }),
      Job.countDocuments(), Job.countDocuments({ isActive: true })
    ]);
    res.json({ success: true, stats: { users, farmers, students, sellers, products, complaints, pendingComplaints, resolvedComplaints, jobs, activeJobs } });
  } catch (error) { next(error); }
});

router.get('/users', requireAdminPermission('users.read'), async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
    const search = String(req.query.search || '').trim();
    const filter: Record<string, unknown> = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { phone: { $regex: search, $options: 'i' } }] } : {};
    const [items, total] = await Promise.all([User.find(filter).select('-password').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), User.countDocuments(filter)]);
    res.json({ success: true, users: items, page, pages: Math.ceil(total / limit), total });
  } catch (error) { next(error); }
});

router.get('/administrators', requireSuperAdmin, async (_req, res, next) => {
  try {
    const administrators = await Administrator.find().select('-password').sort({ createdAt: -1 }).lean();
    res.json({ success: true, administrators });
  } catch (error) { next(error); }
});

router.post('/administrators', requireSuperAdmin, async (req: AdminRequest, res, next) => {
  try {
    const { name, email: rawEmail, password, permissions = [] } = req.body;
    const email = String(rawEmail || '').trim().toLowerCase();
    if (!name || !email || typeof password !== 'string' || password.length < 12 || !Array.isArray(permissions))
      return res.status(400).json({ success: false, message: 'Name, email, 12+ character password, and permissions are required' });
    const admin = await Administrator.create({ name, email, password: await bcrypt.hash(password, 12), role: 'admin', permissions: permissions.filter((p: unknown) => typeof p === 'string') });
    await AuditLog.create({ actor: req.administrator._id, actorEmail: req.administrator.email, action: 'administrator.created', targetType: 'Administrator', targetId: String(admin._id), context: { permissions: admin.permissions } });
    res.status(201).json({ success: true, administrator: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, permissions: admin.permissions } });
  } catch (error) { next(error); }
});

router.get('/complaints', requireAdminPermission('complaints.read'), async (req, res, next) => {
  try {
    const filter: { status?: IComplaint['status'] } = {};
    if (req.query.status && ['pending', 'in-progress', 'resolved'].includes(String(req.query.status))) {
      filter.status = String(req.query.status) as IComplaint['status'];
    }
    const complaints = await Complaint.find(filter).populate('reportedBy', 'name phone').sort({ createdAt: -1 }).limit(100).lean();
    res.json({ success: true, complaints });
  } catch (error) { next(error); }
});

router.patch('/complaints/:id/status', requireAdminPermission('complaints.manage'), async (req: AdminRequest, res, next) => {
  try {
    const status = req.body.status;
    if (!['pending', 'in-progress', 'resolved'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid complaint status' });
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!complaint) return res.status(404).json({ success: false, message: 'Complaint not found' });
    await AuditLog.create({ actor: req.administrator._id, actorEmail: req.administrator.email, action: 'complaint.status_changed', targetType: 'Complaint', targetId: String(complaint._id), context: { status } });
    res.json({ success: true, complaint });
  } catch (error) { next(error); }
});

router.get('/marketplace', requireAdminPermission('marketplace.read'), async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
    const [products, total] = await Promise.all([Product.find().populate('seller', 'name phone').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Product.countDocuments()]);
    res.json({ success: true, products, page, pages: Math.ceil(total / limit), total });
  } catch (error) { next(error); }
});

router.patch('/marketplace/:id/approval', requireAdminPermission('marketplace.manage'), async (req: AdminRequest, res, next) => {
  try {
    if (typeof req.body.isApproved !== 'boolean') return res.status(400).json({ success: false, message: 'isApproved must be true or false' });
    const product = await Product.findByIdAndUpdate(req.params.id, { isApproved: req.body.isApproved }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Listing not found' });
    await AuditLog.create({ actor: req.administrator._id, actorEmail: req.administrator.email, action: req.body.isApproved ? 'product.approved' : 'product.rejected', targetType: 'Product', targetId: String(product._id) });
    res.json({ success: true, product });
  } catch (error) { next(error); }
});

router.patch('/users/:id/status', requireAdminPermission('users.manage'), async (req: AdminRequest, res, next) => {
  try {
    if (typeof req.body.isActive !== 'boolean') return res.status(400).json({ success: false, message: 'isActive must be true or false' });
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await AuditLog.create({ actor: req.administrator._id, actorEmail: req.administrator.email, action: req.body.isActive ? 'user.activated' : 'user.deactivated', targetType: 'User', targetId: String(user._id) });
    res.json({ success: true, user });
  } catch (error) { next(error); }
});

router.get('/audit-logs', requireAdminPermission('audit.read'), async (req, res, next) => {
  try {
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ success: true, logs });
  } catch (error) { next(error); }
});

export default router;
