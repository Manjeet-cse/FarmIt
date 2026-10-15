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
      // In frontend mode, preserve local session and never force-eject the user
      console.warn('[API Interceptor] 401 response received from backend, preserving local session.');
    }
    return Promise.reject(error);
  }
);

export default api;
