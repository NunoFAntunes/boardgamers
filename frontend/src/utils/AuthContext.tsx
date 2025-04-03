'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUser, logout, isAuthenticated, isReviewer } from './auth';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isReviewerRole: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isReviewerRole: false,
  login: () => {},
  logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component for the auth context
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReviewerRole, setIsReviewerRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getUser();
        if (userData) {
          setUser(userData);
          setIsLoggedIn(true);
          setIsReviewerRole(isReviewer());
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsReviewerRole(userData.role === 'REVIEWER');
  };

  // Logout function
  const handleLogout = () => {
    logout();
    setUser(null);
    setIsLoggedIn(false);
    setIsReviewerRole(false);
  };

  // Value for the context provider
  const contextValue: AuthContextType = {
    user,
    isLoggedIn,
    isReviewerRole,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
} 