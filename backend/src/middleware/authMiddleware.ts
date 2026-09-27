import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/env';
import { userRepository } from '../repositories/userRepository';
import { UserRole } from '../types';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export const authenticateJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Authentication token is required.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as AuthenticatedUser;
    // Verify user still exists in database
    const existing = userRepository.findById(decoded.id);
    if (!existing) {
      return res.status(401).json({
        success: false,
        error: 'USER_NOT_FOUND',
        message: 'The authenticated user no longer exists.'
      });
    }

    req.user = {
      id: existing.id,
      email: existing.email,
      role: existing.role,
      name: existing.name
    };
    next();
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      error: 'INVALID_TOKEN',
      message: 'Token is invalid or has expired.'
    });
  }
};
