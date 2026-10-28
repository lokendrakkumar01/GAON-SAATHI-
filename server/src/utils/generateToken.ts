import jwt from 'jsonwebtoken';
import { IUser } from '../models/User.js';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, roles: user.roles },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};
