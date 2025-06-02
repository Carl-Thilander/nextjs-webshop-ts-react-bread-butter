// Auth-related types
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type RegisterResult = { success: true } | { error: string };
