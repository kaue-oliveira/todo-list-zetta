export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  expiresIn: number;
  user: User;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface TaskDTO {
  name: string;
  description?: string;
  status?: 'PENDING' | 'COMPLETED';
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
