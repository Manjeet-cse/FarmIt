import axios from 'axios';

// Create generic Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('farmit_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle global errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // In dev bypass mode, NEVER auto-redirect or clear the user session
      const userStr = localStorage.getItem('farmit_user');
      const token = localStorage.getItem('farmit_token');
      const isBypass = token === 'dev-bypass-token' || (userStr && (userStr.includes('dev-') || userStr.includes('bypass')));

      if (!isBypass) {
        localStorage.removeItem('farmit_token');
        localStorage.removeItem('farmit_user');
        window.location.href = '/login';
      } else {
        console.warn('[API Interceptor] Backend returned 401, but preserving bypass session.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
