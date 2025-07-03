import { api } from "@/lib/api";
// ✅ CORREÇÃO: Importando os tipos inferidos do schema.
import { LoginPayload, RegisterPayload } from "@/lib/schemas/auth-schema";

// A interface de resposta está correta, alinhada com o LoginClientOutput.cs do backend.
export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
}

class AuthService {
  /**
   * Registra um novo cliente.
   * Mapeia para: POST /clients/register
   * @param data - Os dados do novo cliente, validados pelo registerSchema.
   */
  // ✅ CORREÇÃO: Usando o tipo 'RegisterPayload'.
  async register(data: RegisterPayload): Promise<void> {
    await api.post("/clients/register", data);
  }

  /**
   * Autentica um cliente e retorna os tokens.
   * Mapeia para: POST /clients/login
   * @param data - As credenciais do cliente.
   */
  // ✅ CORREÇÃO: Usando o tipo 'LoginPayload'.
  async login(data: LoginPayload): Promise<LoginResponse> {
    const { data: responseData } = await api.post<LoginResponse>(
      "/clients/login",
      data
    );
    return responseData;
  }
}

export const authService = new AuthService();
