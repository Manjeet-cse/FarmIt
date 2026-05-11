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
      // Handle unauthorized (clear token, redirect to login)
      localStorage.removeItem('farmit_token');
      localStorage.removeItem('farmit_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
