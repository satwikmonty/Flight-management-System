import { create } from "zustand";

interface AuthState {
  user: { email: string; name: string } | null;
  login: (user: AuthState["user"]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
}));