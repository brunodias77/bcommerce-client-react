import { api } from "@/lib/api";
import { Order } from "@/lib/definitions";

/**
 * =================================================================
 * DTOs (Data Transfer Objects) para o Serviço de Pedidos
 * =================================================================
 * Interfaces que representam os dados enviados para a API de pedidos.
 */

// Corresponde ao CreateOrderInput.cs do backend
interface CreateOrderPayload {
  shippingAddressId: string;
  billingAddressId: string;
  shippingFee: number;
  notes?: string;
}

// Corresponde ao ApplyCouponInput.cs do backend
interface ApplyCouponPayload {
  couponCode: string;
}

// Corresponde ao ProcessPaymentInput.cs do backend
interface ProcessPaymentPayload {
  paymentMethodToken: string;
}

/**
 * =================================================================
 * SERVIÇO DE PEDIDOS (OrderService)
 * =================================================================
 * Encapsula todas as chamadas de API relacionadas a pedidos.
 */
class OrderService {
  /**
   * Cria um novo pedido a partir do carrinho do usuário.
   * Mapeia para: POST /api/orders
   * @param payload - Os dados para a criação do pedido.
   */
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const { data } = await api.post<Order>("/orders", payload);
    return data;
  }

  /**
   * Aplica um cupom de desconto a um pedido existente.
   * Mapeia para: POST /api/orders/{orderId}/apply-coupon
   * @param orderId - O ID do pedido ao qual o cupom será aplicado.
   * @param payload - O objeto contendo o código do cupom.
   */
  async applyCoupon(
    orderId: string,
    payload: ApplyCouponPayload
  ): Promise<Order> {
    const { data } = await api.post<Order>(
      `/orders/${orderId}/apply-coupon`,
      payload
    );
    return data;
  }

  /**
   * Processa o pagamento de um pedido.
   * Mapeia para: POST /api/orders/{orderId}/pay
   * @param orderId - O ID do pedido a ser pago.
   * @param payload - O objeto contendo o token do método de pagamento.
   */
  async processPayment(
    orderId: string,
    payload: ProcessPaymentPayload
  ): Promise<Order> {
    const { data } = await api.post<Order>(`/orders/${orderId}/pay`, payload);
    return data;
  }
}

export const orderService = new OrderService();
