import { create } from 'zustand';
import { loginApi, logoutApi } from '../services/auth.service';

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password?: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await loginApi({ email, password });

      if (response.data && (response.data.access_token || response.data.token)) {
        const token = response.data.access_token || response.data.token!;
        const user = response.data.user || {
          id: 'user-1',
          email,
          name: email.split('@')[0],
          role: 'client',
        };

        set({
          isAuthenticated: true,
          token,
          user,
          isLoading: false,
          error: null,
        });
        return true;
      }

      if (response.error && response.status > 0) {
        set({
          isLoading: false,
          error: response.error,
        });
        return false;
      }

      console.warn('Server offline/unreachable. Falling back to dev mock login.');
      set({
        isAuthenticated: true,
        token: 'dev-mock-token-123',
        user: {
          id: 'client-alex',
          email: email || 'alex@azcend.com',
          name: 'Alex',
          role: 'client',
        },
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || 'Login failed. Please try again.',
      });
      return false;
    }
  },

  logout: async () => {
    const { token } = get();
    if (token && token !== 'dev-mock-token-123') {
      await logoutApi(token).catch(() => null);
    }
    set({
      isAuthenticated: false,
      token: null,
      user: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
