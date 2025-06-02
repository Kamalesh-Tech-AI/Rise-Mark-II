import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole | null;
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

// Mock authentication for MVP demo
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  activeRole: null,
  
  login: (user) => set({
    user,
    isAuthenticated: true,
    activeRole: user.roles[0] || null,
  }),
  
  logout: () => set({
    user: null,
    isAuthenticated: false,
    activeRole: null,
  }),
  
  switchRole: (role) => set((state) => {
    if (!state.user || !state.user.roles.includes(role)) {
      return state;
    }
    return {
      ...state,
      activeRole: role,
    };
  }),
}));