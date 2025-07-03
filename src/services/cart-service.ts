import { api } from "@/lib/api";
import { Cart, CartItem } from "@/lib/definitions";

/**
 * =================================================================
 * DTOs (Data Transfer Objects) para o Serviço de Carrinho
 * =================================================================
 * Estas interfaces representam os dados que são enviados para a API.
 */

// Corresponde ao AddItemToCartInput.cs
interface AddToCartPayload {
  productVariantId: string;
  quantity: number;
}

// Corresponde ao UpdateCartItemQuantityInput.cs
interface UpdateQuantityPayload {
  newQuantity: number;
}

/**
 * =================================================================
 * SERVIÇO DE CARRINHO (CartService)
 * =================================================================
 * Encapsula todas as chamadas de API relacionadas ao carrinho de compras.
 */
class CartService {
  /**
   * Busca o carrinho do usuário logado. Se não existir, a API criará um novo.
   * Mapeia para: GET /api/cart
   */
  async getCart(): Promise<Cart> {
    const { data } = await api.get<Cart>("/cart");
    return data;
  }

  /**
   * Adiciona um novo item ao carrinho.
   * Mapeia para: POST /api/cart/items
   * @param payload - Os dados do item a ser adicionado.
   */
  async addItem(payload: AddToCartPayload): Promise<Cart> {
    const { data } = await api.post<Cart>("/cart/items", payload);
    return data;
  }

  /**
   * Atualiza a quantidade de um item específico no carrinho.
   * Mapeia para: PUT /api/cart/items/{cartItemId}
   * @param cartItemId - O ID do item de carrinho a ser atualizado.
   * @param payload - O objeto contendo a nova quantidade.
   */
  async updateItemQuantity(
    cartItemId: string,
    payload: UpdateQuantityPayload
  ): Promise<Cart> {
    const { data } = await api.put<Cart>(`/cart/items/${cartItemId}`, payload);
    return data;
  }

  /**
   * Remove um item do carrinho.
   * Mapeia para: DELETE /api/cart/items/{cartItemId}
   * @param cartItemId - O ID do item de carrinho a ser removido.
   */
  async removeItem(cartItemId: string): Promise<Cart> {
    const { data } = await api.delete<Cart>(`/cart/items/${cartItemId}`);
    return data;
  }
}

export const cartService = new CartService();
