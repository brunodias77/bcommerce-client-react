// src/services/cep-service.ts
import axios from "axios";

// Interface para a resposta da API ViaCEP
export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

class CepService {
  private api = axios.create({
    baseURL: "https://viacep.com.br/ws",
  });

  /**
   * Busca um endereço pelo CEP.
   * @param cep - O CEP a ser buscado (apenas números).
   * @returns Os dados do endereço ou null se não for encontrado.
   */
  async getAddressByCep(cep: string): Promise<ViaCepResponse | null> {
    try {
      const { data } = await this.api.get<ViaCepResponse>(`/${cep}/json/`);
      if (data.erro) {
        return null; // CEP não encontrado na base do ViaCEP
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      return null;
    }
  }
}

export const cepService = new CepService();
