import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/User.js';

export const generateToken = (user: IUser): string => {
  const expiresIn = (process.env.JWT_EXPIRE || '7d') as SignOptions['expiresIn'];
  return jwt.sign(
    { id: user._id, roles: user.roles },
    process.env.JWT_SECRET as string,
    { expiresIn }
  );
};
