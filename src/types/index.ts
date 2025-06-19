// Data models based on the Blog API documentation
export interface User {
  id: number;
  username: string;
  role: 'WRITER' | 'ADMIN' | 'MANAGER' | 'STAFF';
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: User;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId?: number;
  userName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsersResponse {
  users: User[];
  pagination: PaginationInfo;
}

// TODO: Students - Add interfaces for error responses and other API responses as needed
// For example, you might need interfaces for post creation responses or user update responses
