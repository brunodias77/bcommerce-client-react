import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Profile } from "@/lib/definitions";

/**
 * =================================================================
 * DEFINIÇÃO DO ESTADO E AÇÕES DA STORE DE AUTENTICAÇÃO
 * =================================================================
 */
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: Profile | null;
  isAuthenticated: boolean;

  // --- AÇÕES ---
  login: (payload: { token: string; refreshToken: string }) => void;
  logout: () => void;
  setUser: (user: Profile | null) => void;
}

/**
 * =================================================================
 * CRIAÇÃO DA STORE ZUSTAND (`useAuthStore`)
 * =================================================================
 * Gerencia o estado de autenticação, persistindo os tokens no localStorage.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      /**
       * Define os tokens no estado após um login bem-sucedido.
       */
      login: (payload) => {
        set({
          token: payload.token,
          refreshToken: payload.refreshToken,
          isAuthenticated: true,
        });
      },

      /**
       * Limpa o estado de autenticação (tokens e usuário).
       */
      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      /**
       * Define os dados do perfil do usuário no estado.
       */
      setUser: (user) => {
        set({ user });
      },
    }),
    {
      // Configuração da persistência
      name: "auth-storage", // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage
      // Define quais partes do estado serão persistidas
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
