import { api } from "@/lib/api";
import { Profile, VerifyEmailResponse } from "@/lib/definitions";

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
    // Envia o token como um parâmetro de busca (query param)
    const { data } = await api.get<VerifyEmailResponse>(
      "/clients/verify-email",
      {
        params: { token },
      }
    );
    return data;
  }
}

export const clientService = new ClientService();
