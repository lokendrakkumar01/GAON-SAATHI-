import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'अनधिकृत, कृपया लॉगिन करें' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'उपयोगकर्ता नहीं मिला' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'अनधिकृत, कृपया लॉगिन करें' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.some(role => req.user.roles.includes(role))) {
      return res.status(403).json({ success: false, message: 'इस कार्य के लिए अनुमति नहीं है' });
    }
    next();
  };
};
