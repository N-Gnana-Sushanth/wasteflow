import { apiClient } from './client';
import { User, UserRole } from '../../types';

export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const res = await apiClient.post('/auth/login', { email, password });
    if (res.data?.token) {
      apiClient.setToken(res.data.token);
    }
    return res.data;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    address?: string;
    zone?: string;
  }): Promise<{ user: User; token: string }> => {
    const res = await apiClient.post('/auth/register', data);
    if (res.data?.token) {
      apiClient.setToken(res.data.token);
    }
    return res.data;
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },

  updateMe: async (data: Partial<User>): Promise<User> => {
    const res = await apiClient.put('/users/me', data);
    return res.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const res = await apiClient.get('/users');
    return res.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.setToken(null);
    }
  }
};
