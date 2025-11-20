'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';
import { User, INITIAL_USERS } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('auth-user', null);

  const login = (email: string, password?: string): boolean => {
    // This is a mock login. In a real app, you'd verify the password against a backend.
    const foundUser = INITIAL_USERS.find(u => u.email === email && u.role === 'customer');
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };
  
  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
