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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // default citizen
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('wf_auth_token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Synchronize active role
  const activeRole = currentUser.role;

  useEffect(() => {
    // Attempt to verify with backend on boot
    const initAuth = async () => {
      try {
        const user = await authApi.getMe();
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Fallback to seeded demo user
        console.info('[Auth] Using seeded profile baseline.');
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
  };

  const switchUser = (userId: string) => {
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (found) setCurrentUser(found);
  };

  const updateUserPoints = (delta: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      points: (prev.points || 0) + delta
    }));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user, token } = await authApi.login(email, password);
      setCurrentUser(user);
      setToken(token);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      console.error('[Login Failed]:', err.message);
      // Demo fallback login matching
      const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        setCurrentUser(found);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // Ignore
    } finally {
      setToken(null);
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
        login,
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
