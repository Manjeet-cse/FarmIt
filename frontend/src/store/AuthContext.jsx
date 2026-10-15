import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

// ── DEV BYPASS: Auto-login with dummy user (comment this block to restore real auth) ──
const DUMMY_USER = {
  _id: 'dev-bypass-001',
  name: 'Manjeet Lodha',
  phone: '9876543210',
  role: 'farmer',
  location: 'Guna, Madhya Pradesh',
  token: 'dev-bypass-token',
  profileImage: '/images/manjeet_profile.webp',
};

export function AuthProvider({ children }) {
  // Synchronously initialize user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('farmit_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed._id || parsed.phone)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse stored user', e);
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync state to localStorage to guarantee token & user are always available
  useEffect(() => {
    if (user) {
      localStorage.setItem('farmit_user', JSON.stringify(user));
      localStorage.setItem('farmit_token', user.token || 'dummy-farmit-token');
      localStorage.setItem('role', user.role || 'farmer');
    }
  }, [user]);

  const bypassLogin = useCallback((phone = '9876543210', name = '', location = '') => {
    const formattedPhone = String(phone).replace(/\D/g, '').slice(0, 10) || '9876543210';
    const bypassUser = {
      _id: 'user-' + formattedPhone,
      name: name || (formattedPhone === '9876543210' ? 'Manjeet Lodha' : 'Kisan ' + formattedPhone.slice(-4)),
      phone: formattedPhone,
      role: 'farmer',
      location: location || 'Guna, Madhya Pradesh',
      token: 'dummy-token-' + formattedPhone,
      profileImage: '/images/manjeet_profile.webp',
    };
    try {
      localStorage.setItem('farmit_token', bypassUser.token);
      localStorage.setItem('farmit_user', JSON.stringify(bypassUser));
      localStorage.setItem('role', 'farmer');
    } catch (e) {
      console.warn('Failed to store in localStorage', e);
    }
    setUser(bypassUser);
    setError(null);
    return { success: true, data: bypassUser };
  }, []);

  const login = useCallback(async (identifier, password) => {
    setError(null);
    setLoading(true);
    // Pure frontend dummy login: accepts any 10-digit number
    const cleanPhone = String(identifier).replace(/\D/g, '').slice(0, 10) || '9876543210';
    const res = bypassLogin(cleanPhone);
    setLoading(false);
    return res;
  }, [bypassLogin]);

  const signup = useCallback(async (userData) => {
    setError(null);
    setLoading(true);
    // Pure frontend dummy signup: creates dummy user from provided data
    const cleanPhone = String(userData.phone || userData.mobile || '').replace(/\D/g, '').slice(0, 10) || '9876543210';
    const name = userData.name || userData.fullName || 'Kisan Mitra';
    const location = userData.location || userData.village || userData.state || 'Guna, Madhya Pradesh';
    const res = bypassLogin(cleanPhone, name, location);
    setLoading(false);
    return res;
  }, [bypassLogin]);

  const logout = useCallback(() => {
    try {
      authService.logout();
      localStorage.removeItem('farmit_token');
      localStorage.removeItem('farmit_user');
      localStorage.removeItem('role');
    } catch (e) {
      console.warn('Logout error', e);
    }
    setUser(null);
    setError(null);
  }, []);

  const googleLogin = useCallback(async (credential) => {
    setError(null);
    setLoading(true);
    const res = bypassLogin('9876543210', 'Manjeet Lodha');
    setLoading(false);
    return res;
  }, [bypassLogin]);

  const updateProfile = useCallback(async (userData) => {
    setError(null);
    setLoading(true);
    setUser(prev => {
      const updated = { ...prev, ...userData };
      try {
        localStorage.setItem('farmit_user', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save updated user', e);
      }
      return updated;
    });
    setLoading(false);
    return { success: true, data: userData };
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const stored = localStorage.getItem('farmit_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) setUser(parsed);
      }
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  }, []);

  const checkUser = useCallback(async (identifier) => {
    try {
      const response = await authService.checkUser(identifier);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'User not found.';
      return { success: false, message };
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
    checkUser,
    bypassLogin,
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
