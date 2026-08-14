import { create } from 'zustand';
import type { UserProfile } from '../features/profile/types';
import { loginApi, logoutApi } from '../services/auth.service';
import { fetchUserProfileApi } from '../services/user.service';

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface CoachInfo {
  id: string;
  name: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  profile: UserProfile | null;
  coach: CoachInfo | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  profile: null,
  coach: null,
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

        get().fetchProfile();
        return true;
      }

      if (response.error) {
        set({
          isLoading: false,
          error: response.error,
        });
        return false;
      }

      set({
        isLoading: false,
        error: 'Network request failed. Please check your connection.',
      });
      return false;
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || 'Login failed. Please try again.',
      });
      return false;
    }
  },

  fetchProfile: async () => {
    const { token, logout } = get();
    if (!token) {
      await logout();
      return;
    }

    const res = await fetchUserProfileApi(token);
    if (res.data) {
      const p = res.data;
      const coachObj = p.coach || p.assignedCoach;
      const coachData: CoachInfo | null = coachObj
        ? {
          id: coachObj.id,
          name: `${coachObj.firstName || ''} ${coachObj.lastName || ''}`.trim() || coachObj.name,
          avatarUrl: coachObj.avatarUrl,
          isOnline: true,
        }
        : null;

      const clientName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.name || (p.email ? p.email.split('@')[0] : 'User');

      set({
        profile: {
          id: p.id || p.userId || '',
          name: clientName,
          email: p.email || '',
          mobile: p.mobile || p.phone || '',
          avatarUrl: p.avatarUrl || '',
          subscription: p.subscriptionName || 'Free',
          joinedAt: p.joinedDate || p.joinedAt || p.createdAt || new Date().toISOString(),
        },
        coach: coachData,
      });
    } else {
      await logout();
    }
  },

  logout: async () => {
    const { token } = get();
    if (token) {
      await logoutApi(token).catch(() => null);
    }
    set({
      isAuthenticated: false,
      token: null,
      user: null,
      profile: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
