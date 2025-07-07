// file: src/services/cart-service.ts

import { api } from "@/lib/api";
import { Cart } from "@/lib/definitions";
import { handleApiError } from "@/lib/handle-api-error"; // Caminho corrigido

// DTOs (Payloads)
interface AddToCartPayload {
  productVariantId: string;
  quantity: number;
}

interface UpdateQuantityPayload {
  newQuantity: number;
}

enum CartEndpoints {
  BASE = "/cart",
  ITEMS = "/cart/items",
  ITEM_DETAIL = "/cart/items/",
}

class CartService {
  async getCart(): Promise<Cart> {
    try {
      const { data } = await api.get<Cart>(CartEndpoints.BASE);
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async addItem(payload: AddToCartPayload): Promise<Cart> {
    try {
      const { data } = await api.post<Cart>(CartEndpoints.ITEMS, payload);
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async updateItemQuantity(
    cartItemId: string,
    payload: UpdateQuantityPayload
  ): Promise<Cart> {
    try {
      const { data } = await api.put<Cart>(
        `${CartEndpoints.ITEM_DETAIL}${cartItemId}`,
        payload
      );
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async removeItem(cartItemId: string): Promise<Cart> {
    try {
      const { data } = await api.delete<Cart>(
        `${CartEndpoints.ITEM_DETAIL}${cartItemId}`
      );
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const cartService = new CartService();
