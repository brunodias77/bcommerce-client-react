import { api } from "@/lib/api";
import { Order } from "@/lib/definitions";

/**
 * =================================================================
 * DTO (Data Transfer Object) para o Serviço de Pagamento
 * =================================================================
 * Interface que representa os dados enviados para a API de pagamento.
 * Corresponde ao payload esperado pelo endpoint ProcessPayment.
 */
interface ProcessPaymentPayload {
  paymentMethodToken: string;
}

/**
 * =================================================================
 * SERVIÇO DE PAGAMENTO (PaymentService)
 * =================================================================
 * Encapsula as chamadas de API relacionadas ao processamento de pagamentos.
 */
class PaymentService {
  /**
   * Processa o pagamento para um pedido específico.
   * Mapeia para: POST /api/orders/{orderId}/pay
   * @param orderId - O ID do pedido a ser pago.
   * @param payload - O objeto contendo o token do método de pagamento.
   */
  async processPayment(
    orderId: string,
    payload: ProcessPaymentPayload
  ): Promise<Order> {
    // O backend espera o token de pagamento no corpo da requisição.
    const { data } = await api.post<Order>(`/orders/${orderId}/pay`, payload);
    return data;
  }
}

export const paymentService = new PaymentService();
