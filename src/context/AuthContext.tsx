import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authApi } from '../services/api/authApi';
import { MOCK_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User;
  activeRole: UserRole;
  isAuthenticated: boolean;
  token: string | null;
  setRole: (role: UserRole) => void;
  updateUserPoints: (delta: number) => void;
  switchUser: (userId: string) => void;
  switchDemoRole: (role: UserRole) => Promise<boolean>;
  login: (email: string, password: string) => Promise<User | null>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    address?: string;
    zone?: string;
  }) => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CREDENTIALS: Record<UserRole, { email: string; pass: string }> = {
  citizen: { email: 'citizen@wasteflow.gov', pass: 'Citizen@123' },
  admin: { email: 'admin@wasteflow.gov', pass: 'Admin@123' },
  driver: { email: 'driver@wasteflow.gov', pass: 'Driver@123' },
  facility: { email: 'facility@wasteflow.gov', pass: 'Facility@123' }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('wf_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return MOCK_USERS[0];
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('wf_auth_token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('wf_auth_token'));

  // Synchronize active role directly from authenticated user
  const activeRole = currentUser.role;

  useEffect(() => {
    // Attempt to verify with backend on boot
    const initAuth = async () => {
      const storedToken = localStorage.getItem('wf_auth_token');
      if (!storedToken) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const user = await authApi.getMe();
        if (user) {
          setCurrentUser(user);
          localStorage.setItem('wf_user_profile', JSON.stringify(user));
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Fallback to cached profile baseline
        const saved = localStorage.getItem('wf_user_profile');
        if (saved) {
          try {
            setCurrentUser(JSON.parse(saved));
            setIsAuthenticated(true);
          } catch (e) {
            setIsAuthenticated(false);
          }
        }
      }
    };
    initAuth();
  }, []);

  const setRole = (role: UserRole) => {
    const matched = MOCK_USERS.find((u) => u.role === role) || {
      ...currentUser,
      role
    };
    setCurrentUser(matched);
    localStorage.setItem('wf_user_profile', JSON.stringify(matched));
  };

  const switchUser = (userId: string) => {
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('wf_user_profile', JSON.stringify(found));
    }
  };

  const switchDemoRole = async (role: UserRole): Promise<boolean> => {
    const creds = DEMO_CREDENTIALS[role];
    try {
      const res = await authApi.login(creds.email, creds.pass);
      if (res?.user) {
        setCurrentUser(res.user);
        setToken(res.token);
        setIsAuthenticated(true);
        localStorage.setItem('wf_user_profile', JSON.stringify(res.user));
        return true;
      }
    } catch (err) {
      // Offline fallback
      const found = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
      setCurrentUser(found);
      setIsAuthenticated(true);
      localStorage.setItem('wf_user_profile', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const updateUserPoints = (delta: number) => {
    setCurrentUser((prev) => {
      const updated = {
        ...prev,
        points: (prev.points || 0) + delta
      };
      localStorage.setItem('wf_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const res = await authApi.login(email, password);
      if (res?.user) {
        setCurrentUser(res.user);
        setToken(res.token);
        setIsAuthenticated(true);
        localStorage.setItem('wf_user_profile', JSON.stringify(res.user));
        return res.user;
      }
      return null;
    } catch (err: any) {
      console.warn('[Login Error / Fallback]:', err.message);
      // Demo fallback login matching
      const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        setCurrentUser(found);
        setIsAuthenticated(true);
        localStorage.setItem('wf_user_profile', JSON.stringify(found));
        return found;
      }
      return null;
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    address?: string;
    zone?: string;
  }): Promise<User | null> => {
    try {
      const res = await authApi.register(data);
      if (res?.user) {
        setCurrentUser(res.user);
        setToken(res.token);
        setIsAuthenticated(true);
        localStorage.setItem('wf_user_profile', JSON.stringify(res.user));
        return res.user;
      }
      return null;
    } catch (err: any) {
      console.warn('[Register Error / Fallback]:', err.message);
      const newUser: User = {
        id: `user-c-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        phone: data.phone,
        address: data.address,
        zone: data.zone || 'Hitec City - Zone 1',
        points: 100,
        badge: 'Green Citizen',
        level: 1
      };
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('wf_user_profile', JSON.stringify(newUser));
      return newUser;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // Ignore
    } finally {
      localStorage.removeItem('wf_auth_token');
      localStorage.removeItem('wf_user_profile');
      setToken(null);
      setIsAuthenticated(false);
      setCurrentUser(MOCK_USERS[0]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole,
        isAuthenticated,
        token,
        setRole,
        updateUserPoints,
        switchUser,
        switchDemoRole,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
