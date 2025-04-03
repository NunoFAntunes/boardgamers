interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  role?: 'USER' | 'REVIEWER';
}

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    }
  }
}

// Backend API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.warn('NEXT_PUBLIC_API_URL environment variable is not set. Using default fallback URL.');
}

// Ensure we always have a base URL even if env is not set
const BASE_API_URL = API_URL || 'http://localhost:3001/api';

// Helper function to get appropriate fetch options for authenticated requests
function getFetchOptions(method: string, body?: any, includeAuth: boolean = true): RequestInit {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Always include credentials for CORS
  };

  // Add body if provided
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Add authorization header if required and token exists
  if (includeAuth) {
    const token = getToken();
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
  }

  return options;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/login`, 
      getFetchOptions('POST', credentials, false)
    );

    const data = await response.json();
    
    if (data.success && data.data?.token) {
      // Store token in localStorage
      localStorage.setItem('token', data.data.token);
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login. Please try again.'
    };
  }
}

export async function register(userData: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/register`, 
      getFetchOptions('POST', userData, false)
    );

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'An error occurred during registration. Please try again.'
    };
  }
}

export function logout(): void {
  // Remove token and user info from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Optional: Call logout endpoint to invalidate token on server
  fetch(`${BASE_API_URL}/auth/logout`, getFetchOptions('POST'))
    .catch(error => {
      console.error('Logout error:', error);
    });
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function getUser(): { id: string; email: string; role: string } | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

export function isReviewer(): boolean {
  const user = getUser();
  return user?.role === 'REVIEWER';
} 