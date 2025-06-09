import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token: string) => set({ token }),
      logout: () => set({ token: null, user: null }),
      setUser: (user: User) => set({ user }),
    }),
    {
      name: "auth-storage", // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage), // Persistir no localStorage
    }
  )
);
