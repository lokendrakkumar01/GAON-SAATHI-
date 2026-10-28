import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateToken } from '../utils/generateToken.js';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response, next: any) => {
  try {
    const { name, phone, password, village, district, roles } = req.body;

    if (!name || !phone || !password || !district) {
      return next(new AppError('सभी आवश्यक फील्ड भरें', 400));
    }

    const userExists = await User.findOne({ phone });
    if (userExists) {
      return next(new AppError('यह मोबाइल नंबर पहले से पंजीकृत है', 400));
    }

    // Prevent admin role registration
    let userRoles = ['Villager'];
    if (roles && Array.isArray(roles)) {
      userRoles = roles.filter(r => r !== 'Administrator');
      if (userRoles.length === 0) userRoles = ['Villager'];
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      village,
      district,
      roles: userRoles
    });

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      message: 'पंजीकरण सफल',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        roles: user.roles,
        village: user.village,
        district: user.district
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: any) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return next(new AppError('मोबाइल नंबर और पासवर्ड आवश्यक है', 400));
    }

    const user = await User.findOne({ phone }).select('+password');
    if (!user) {
      return next(new AppError('गलत मोबाइल नंबर या पासवर्ड', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError('गलत मोबाइल नंबर या पासवर्ड', 401));
    }

    if (!user.isActive) {
      return next(new AppError('खाता निष्क्रिय है', 401));
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      message: 'लॉगिन सफल',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        roles: user.roles,
        village: user.village,
        district: user.district,
        preferredLanguage: user.preferredLanguage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ success: true, message: 'लॉगआउट सफल' });
};

export const getMe = async (req: any, res: Response, next: any) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
