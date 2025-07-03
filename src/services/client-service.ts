import { api } from "@/lib/api";
// ✅ Importando todos os tipos necessários do arquivo de definições
import { AuthResponse, Profile, VerifyEmailResponse } from "@/lib/definitions";

/**
 * =================================================================
 * DTO (Data Transfer Object) para o Serviço de Cliente
 * =================================================================
 * Interface que representa os dados enviados para a API de refresh token.
 */
interface RefreshTokenPayload {
  refreshToken: string;
}

/**
 * =================================================================
 * SERVIÇO DE CLIENTE (ClientService)
 * =================================================================
 * Encapsula todas as chamadas de API relacionadas ao usuário/cliente.
 */
class ClientService {
  /**
   * Busca os dados do perfil do usuário autenticado.
   * Mapeia para: GET /api/clients/me
   */
  async getMyProfile(): Promise<Profile> {
    const { data } = await api.get<Profile>("/clients/me");
    return data;
  }

  /**
   * Envia o token para verificação de e-mail.
   * Mapeia para: GET /api/clients/verify-email
   * @param token - O token recebido por e-mail.
   */
  async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    const { data } = await api.get<VerifyEmailResponse>(
      "/clients/verify-email",
      {
        params: { token }, // Envia como query param: ?token=...
      }
    );
    return data;
  }

  /**
   * ✅ NOVO MÉTODO
   * Envia uma requisição para renovar o token de acesso usando o refresh token.
   * Mapeia para: POST /api/clients/refresh-token
   * @param payload - Objeto contendo o refreshToken.
   */
  async refreshToken(payload: RefreshTokenPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      "/clients/refresh-token",
      payload
    );
    return data;
  }

  /**
   * ✅ NOVO MÉTODO
   * Invalida o token de acesso atual do usuário (logout).
   * Mapeia para: POST /api/clients/logout
   */
  async logout(): Promise<void> {
    // O logout não precisa de payload, apenas do token de autorização no header,
    // que o interceptor do Axios já adiciona.
    await api.post("/clients/logout");
  }
}

export const clientService = new ClientService();
