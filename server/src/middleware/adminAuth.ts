import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Administrator } from '../models/Administrator.js';

export interface AdminRequest extends Request { administrator?: any }

export const protectAdmin = async (req: AdminRequest, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7) : undefined;
    const token = bearer || req.cookies?.adminToken;
    if (!token) return res.status(401).json({ success: false, message: 'Admin login required' });
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; kind?: string };
    if (payload.kind !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });
    const administrator = await Administrator.findById(payload.id);
    if (!administrator?.isActive) return res.status(401).json({ success: false, message: 'Admin account disabled' });
    req.administrator = administrator;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Admin login required' });
  }
};

export const requireAdminPermission = (permission: string) => (req: AdminRequest, res: Response, next: NextFunction) => {
  const admin = req.administrator;
  if (admin?.role === 'super_admin' || admin?.permissions?.includes(permission)) return next();
  return res.status(403).json({ success: false, message: 'You do not have permission for this action' });
};

export const requireSuperAdmin = (req: AdminRequest, res: Response, next: NextFunction) => {
  if (req.administrator?.role === 'super_admin') return next();
  return res.status(403).json({ success: false, message: 'यह सुविधा केवल Super Admin के लिए है' });
};
