import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/env';
import { userRepository } from '../repositories/userRepository';
import { auditLogRepository } from '../repositories/wasteScanRepository';
import { User, UserRole } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class AuthService {
  public async register(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    address?: string;
    zone?: string;
  }): Promise<{ user: Omit<User, 'passwordHash'>; token: string }> {
    const existing = userRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError('A user with this email address already exists.', 400, 'USER_EXISTS');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser: User = {
      id: `user-${data.role[0]}-${Date.now()}`,
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash,
      role: data.role,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      phone: data.phone,
      address: data.address,
      zone: data.zone || 'Hitec City - Zone 1',
      points: data.role === 'citizen' ? 100 : undefined,
      badge: data.role === 'citizen' ? 'Green Citizen' : undefined,
      level: data.role === 'citizen' ? 1 : undefined,
      createdAt: new Date().toISOString()
    };

    userRepository.create(newUser);

    auditLogRepository.create({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: newUser.id,
      userName: newUser.name,
      role: newUser.role,
      action: 'USER_REGISTERED',
      entity: newUser.email,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
      details: `New ${newUser.role} profile registered.`
    });

    const token = this.generateToken(newUser);
    const { passwordHash: _, ...safeUser } = newUser;
    return { user: safeUser, token };
  }

  public async login(email: string, password: string): Promise<{ user: Omit<User, 'passwordHash'>; token: string }> {
    const user = userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
    }

    const token = this.generateToken(user);
    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
  }

  public getUserProfile(userId: string): Omit<User, 'passwordHash'> {
    const user = userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
    }
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  public generateToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      CONFIG.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
}

export const authService = new AuthService();
