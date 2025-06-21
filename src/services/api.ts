import axios from 'axios';
import { AuthResponse, Post, Comment, UsersResponse } from '../types';

// Use the environment variable for the API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // Fallback to localhost for development

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Request Config:', config); // Log the full request configuration
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Authentication APIs
// ✅ Signup function
export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error('Signup failed:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login function
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

// Post APIs
export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get('/api/posts', { withCredentials: true });
  return response.data;
};

export const createPost = async (title: string, content: string): Promise<Post> => {
  const response = await api.post('/api/posts', { title, content }, { withCredentials: true });
  return response.data;
};

// Comment APIs
export const createComment = async (content: string, postId: number, userName?: string): Promise<Comment> => {
  const response = await api.post('/api/comments', { content, postId, userName }, { withCredentials: true });
  return response.data;
};

// Admin APIs
export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  const response = await api.get(`/api/users?page=${page}&limit=${limit}`, { withCredentials: true });
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/api/users/public', { withCredentials: true });
  return response.data;
};

// Order APIs
export const getOrders = async () => {
  const response = await api.get('/api/orders', { withCredentials: true });
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await api.post('/api/orders/create', orderData, { withCredentials: true });
  return response.data;
};

export const updateOrder = async (id: number, orderData: any) => {
  const response = await api.put(`/api/orders/${id}`, orderData, { withCredentials: true });
  return response.data;
};

export const deleteOrder = async (id: number) => {
  const response = await api.delete(`/api/orders/${id}`, { withCredentials: true });
  return response.data;
};

// Reservation APIs
export const getReservations = async () => {
  const response = await api.get('/api/reservations', { withCredentials: true });
  return response.data;
};

export const createReservation = async (reservationData: any) => {
  const response = await api.post('/api/reservations', reservationData, { withCredentials: true });
  return response.data;
};

export const updateReservation = async (id: number, reservationData: any) => {
  const response = await api.put(`/api/reservations/${id}`, reservationData, { withCredentials: true });
  return response.data;
};

export const deleteReservation = async (id: number) => {
  const response = await api.delete(`/api/reservations/${id}`, { withCredentials: true });
  return response.data;
};

// TODO: Students - Add API functions for the following:
// 1. Updating a post (PUT /api/posts/:id)
// 2. Deleting a post (DELETE /api/posts/:id)
// 3. Deleting a comment (DELETE /api/comments/:id)
// 4. Getting a specific user by ID (GET /api/users/:id)
// 5. Admin: Creating a user (POST /api/users)
// 6. Admin: Updating a user (PUT /api/users/:id)
// 7. Admin: Changing user role (PATCH /api/users/:id/role)
// 8. Admin: Deleting a user (DELETE /api/users/:id)
// Ensure proper error handling and type safety

