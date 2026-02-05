import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration (401 errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid!
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';  // Redirect to login
    }
    return Promise.reject(error);
  }
);

// ========== AUTH ===========
export const register = async (userData) => {
  const response = await api.post('/api/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/api/login', credentials);
  return response.data;
};

// ========== EXPENSES ===========
export const getExpenses = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.sort) params.append('sort', filters.sort);
  
  const response = await api.get(`/api/expenses?${params.toString()}`);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await api.post('/api/expenses', expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/api/expenses/${id}`);
  return response.data;
};

export default api;
