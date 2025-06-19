import axios from 'axios';
import { AuthResponse, Post, Comment, UsersResponse } from '../types';

// Base URL from the API documentation
const API_URL = 'http://localhost:3001'; // Explicitly set the backend URL

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
export const signup = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/signup', { username, password });
  return response.data;
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

// Post APIs
export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get('/api/posts');
  return response.data;
};

export const createPost = async (title: string, content: string): Promise<Post> => {
  const response = await api.post('/api/posts', { title, content });
  return response.data;
};

// Comment APIs
export const createComment = async (content: string, postId: number, userName?: string): Promise<Comment> => {
  const response = await api.post('/api/comments', { content, postId, userName });
  return response.data;
};

// Admin APIs
export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  const response = await api.get(`/api/users?page=${page}&limit=${limit}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/api/users/public'); // Use the public route
  return response.data;
};

// Order APIs
export const getOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};

export const createOrder = async (orderData: any) => {
  console.log('createOrder function called with:', orderData); // Log the payload
  try {
    const response = await api.post('/api/orders/create', orderData);
    console.log('API Response from createOrder:', response.data); // Log the response
    return response.data;
  } catch (error: any) {
    console.error('Error in createOrder API call:', error.response?.data || error.message); // Log the error
    throw new Error(error.response?.data?.error || 'Failed to create order');
  }
};

export const updateOrder = async (id: number, orderData: any) => {
  const response = await api.put(`/api/orders/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id: number) => {
  const response = await api.delete(`/api/orders/${id}`);
  return response.data;
};

// Reservation APIs
export const getReservations = async () => {
  const response = await api.get('/api/reservations');
  return response.data;
};

export const createReservation = async (reservationData: any) => {
  const response = await api.post('/api/reservations', reservationData);
  return response; // Return the full response object
};

export const updateReservation = async (id: number, reservationData: any) => {
  const response = await api.put(`/api/reservations/${id}`, reservationData);
  return response.data;
};

export const deleteReservation = async (id: number) => {
  const response = await api.delete(`/api/reservations/${id}`);
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

