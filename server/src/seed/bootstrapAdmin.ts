import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { Administrator } from '../models/Administrator.js';

const { BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_NAME, BOOTSTRAP_ADMIN_PASSWORD } = process.env;
if (!BOOTSTRAP_ADMIN_EMAIL || !BOOTSTRAP_ADMIN_NAME || !BOOTSTRAP_ADMIN_PASSWORD || BOOTSTRAP_ADMIN_PASSWORD.length < 12) {
  throw new Error('Set BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_NAME, and a BOOTSTRAP_ADMIN_PASSWORD of at least 12 characters.');
}

await connectDB();
const email = BOOTSTRAP_ADMIN_EMAIL.trim().toLowerCase();
if (await Administrator.exists({ email })) throw new Error('Administrator already exists; bootstrap is one-time.');
await Administrator.create({ name: BOOTSTRAP_ADMIN_NAME, email, password: await bcrypt.hash(BOOTSTRAP_ADMIN_PASSWORD, 12), role: 'super_admin', permissions: [] });
console.log('Initial Super Admin created. Remove bootstrap credentials from the environment now.');
process.exit(0);
