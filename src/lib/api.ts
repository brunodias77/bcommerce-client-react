import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

// Aqui podemos configurar o interceptor para adicionar o token JWT
// nas requisições autenticadas no futuro.

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Interceptor para adicionar o token JWT
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState(); // Pega o estado mais recente da store
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
