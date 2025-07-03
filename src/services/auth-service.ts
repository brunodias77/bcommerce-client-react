import { api } from "@/lib/api";
import { LoginSchema, RegisterSchema } from "@/lib/schemas/auth-schema";

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  // ✅ CORREÇÃO: O backend retorna também o refreshToken
  refreshToken: string;
}

class AuthService {
  async register(data: RegisterSchema) {
    return api.post("/clients/register", data);
  }

  async login(data: LoginSchema): Promise<LoginResponse> {
    const { data: responseData } = await api.post<LoginResponse>(
      "/clients/login",
      data
    );
    return responseData;
  }
}

export const authService = new AuthService();
