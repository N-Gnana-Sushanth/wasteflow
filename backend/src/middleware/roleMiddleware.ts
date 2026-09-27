import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import { UserRole } from '../types';

export const authorizeRoles = (...allowedRoles: (UserRole | string)[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Authentication required.'
      });
    }

    // Normalize roles (handle 'admin' vs 'MUNICIPAL_ADMIN', etc.)
    const userRole = req.user.role.toLowerCase();
    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase().replace('municipal_', '').replace('_manager', ''));

    if (!normalizedAllowed.includes(userRole) && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN',
        message: `Role '${req.user.role}' is not authorized to access this resource.`
      });
    }

    next();
  };
};
