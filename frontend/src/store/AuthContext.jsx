import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (identifier, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await authService.login(identifier, password);
      setUser(response.data);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      setLoading(false);
      return { success: false, message };
    }
  }, []);

  const signup = useCallback(async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await authService.signup(userData);
      setUser(response.data);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(message);
      setLoading(false);
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const googleLogin = useCallback(async (credential) => {
    setError(null);
    setLoading(true);
    try {
      const response = await authService.googleLogin(credential);
      setUser(response.data);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Google login failed. Please try again.';
      setError(message);
      setLoading(false);
      return { success: false, message };
    }
  }, []);

  const updateProfile = useCallback(async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await authService.updateProfile(userData);
      setUser(response.data);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Profile update failed. Please try again.';
      setError(message);
      setLoading(false);
      return { success: false, message };
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authService.getMe();
      if (response.success && response.data) {
        const token = authService.getToken();
        const userData = { ...response.data, token };
        localStorage.setItem('farmit_user', JSON.stringify(userData));
        setUser(userData);
      }
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    googleLogin,
    updateProfile,
    refreshUser,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
