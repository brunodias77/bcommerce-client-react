import { api } from "@/lib/api";
import { LoginSchema, RegisterSchema } from "@/lib/schemas/auth-schema"; // Importando os tipos do Zod

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
}

class AuthService {
  // Recebe um objeto tipado pelo schema do Zod, não mais FormData
  async register(data: RegisterSchema) {
    // Não precisa mais de cabeçalhos, Axios enviará como application/json por padrão
    return api.post("/clients/register", data);
  }

  // Recebe um objeto tipado, não mais FormData
  async login(data: LoginSchema): Promise<LoginResponse> {
    const { data: responseData } = await api.post<LoginResponse>(
      "/clients/login",
      data
    );
    return responseData;
  }
}

export const authService = new AuthService();
