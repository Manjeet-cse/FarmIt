import api from './api';

const TOKEN_KEY = 'farmit_token';
const USER_KEY = 'farmit_user';

const authService = {
  /**
   * Login with phone/email + password
   * @param {string} identifier - Phone number or email
   * @param {string} password - User password/PIN
   */
  async login(identifier, password) {
    const response = await api.post('/auth/login', { identifier, password });
    if (response.success && response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    return response;
  },

  /**
   * Register a new user
   */
  async signup(userData) {
    const response = await api.post('/auth/signup', userData);
    if (response.success && response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    return response;
  },

  /**
   * Get current authenticated user profile
   */
  async getMe() {
    const response = await api.get('/auth/me');
    return response;
  },

  /**
   * Login/Signup with Google OAuth credential
   * @param {string} credential - Google ID token from Google Sign-In
   */
  async googleLogin(credential) {
    const response = await api.post('/auth/google', { credential });
    if (response.success && response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    return response;
  },

  /**
   * Logout — clear all stored auth data
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Update user profile
   */
  async updateProfile(userData) {
    const response = await api.put('/auth/profile', userData);
    if (response.success && response.data) {
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    return response;
  },

  /**
   * Get stored token
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get stored user from localStorage (quick load, no API call)
   */
  getStoredUser() {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Reset password by phone number
   * @param {string} phone - 10-digit phone number
   * @param {string} newPassword - New password (min 6 chars)
   */
  async resetPassword(phone, newPassword) {
    const response = await api.put('/auth/reset-password', { phone, newPassword });
    return response;
  },
};

export default authService;
