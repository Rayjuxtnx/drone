'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';
import { User, UserRole, INITIAL_USERS } from '@/lib/data';
import {v4 as uuidv4} from 'uuid';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('auth-user', null);
  const [users, setUsers] = useLocalStorage<User[]>('users', INITIAL_USERS);

  const login = (email: string, password?: string): boolean => {
    // This is a mock login. In a real app, you'd verify the password against a backend.
    const foundUser = users.find(u => u.email === email && u.role === 'customer');
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };
  
  const register = (name: string, email: string, password?: string): boolean => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }

    const newUser: User = {
      id: `customer-${uuidv4()}`,
      name,
      email,
      role: 'customer',
    };

    setUsers([...users, newUser]);
    setUser(newUser); // Automatically log in the new user
    return true;
  };

  const logout = () => {
    setUser(null);
  };
  
  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = {
    user,
    login,
    register,
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
