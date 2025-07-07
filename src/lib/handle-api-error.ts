// file: src/lib/utils/handle-api-error.ts

import { isAxiosError } from "axios";

/**
 * Centraliza o tratamento de erros da API (Axios).
 *
 * @param error - O erro capturado no bloco `catch`.
 * @returns Uma instância de `Error` com uma mensagem clara.
 */
export const handleApiError = (error: unknown): Error => {
  if (isAxiosError(error)) {
    // Tenta extrair a mensagem de erro específica do backend.
    const apiErrorMessage = error.response?.data?.errors?.[0]?.message;

    if (apiErrorMessage) {
      return new Error(apiErrorMessage);
    }

    // Se não houver mensagem específica, retorna um erro genérico de API.
    return new Error(
      "Falha na comunicação com nossos servidores. Tente novamente."
    );
  }

  // Se for um erro do JavaScript, mas não do Axios.
  if (error instanceof Error) {
    return error;
  }

  // Para qualquer outro tipo de erro inesperado.
  return new Error("Ocorreu um erro inesperado.");
};
