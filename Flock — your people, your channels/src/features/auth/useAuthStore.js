import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: { id: "22222222-2222-2222-2222-222222222222", username: "DevUser" },
  token: null,
  setAuth: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));