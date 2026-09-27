import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { userRepository } from '../repositories/userRepository';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Account successfully registered.',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'Logged in successfully.',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  public getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = authService.getUserProfile(req.user!.id);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (err) {
      next(err);
    }
  }

  public logout(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  }
}

export const authController = new AuthController();

export class UserController {
  public getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = authService.getUserProfile(req.user!.id);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (err) {
      next(err);
    }
  }

  public updateMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { name, phone, address, zone, avatar } = req.body;
      const updated = userRepository.update(req.user!.id, { name, phone, address, zone, avatar });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      const { passwordHash: _, ...safeUser } = updated;
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        data: safeUser
      });
    } catch (err) {
      next(err);
    }
  }

  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = userRepository.findMany().map(({ passwordHash: _, ...u }) => u);
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (err) {
      next(err);
    }
  }

  public getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = userRepository.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      const { passwordHash: _, ...safeUser } = user;
      res.status(200).json({
        success: true,
        data: safeUser
      });
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
