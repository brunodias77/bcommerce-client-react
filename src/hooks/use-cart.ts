import { create } from "zustand";
import { toast } from "react-toastify";
import { Cart } from "@/lib/definitions";
import { cartService } from "@/services/cart-service";

/**
 * =================================================================
 * DEFINIÇÃO DO ESTADO E AÇÕES DA STORE DO CARRINHO
 * =================================================================
 */
interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isUpdatingItem: string | null; // Armazena o ID do item que está sendo atualizado

  // --- AÇÕES ---
  getCart: () => Promise<void>;
  addItem: (productVariantId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateItemQuantity: (
    cartItemId: string,
    newQuantity: number
  ) => Promise<void>;
}

/**
 * =================================================================
 * CRIAÇÃO DA STORE ZUSTAND (`useCartStore`)
 * =================================================================
 * Hook customizado para gerenciar o estado global do carrinho.
 */
export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: true, // Inicia como true para a busca inicial
  isUpdatingItem: null,

  /**
   * Busca o carrinho do usuário na API e atualiza o estado.
   * Geralmente chamado uma vez quando a aplicação é carregada.
   */
  getCart: async () => {
    try {
      set({ isLoading: true });
      const cartData = await cartService.getCart();
      set({ cart: cartData });
    } catch (error) {
      // Não mostra um toast aqui para não poluir a tela no carregamento inicial.
      // O componente que chamar pode tratar o erro, se necessário.
      console.error("Falha ao buscar o carrinho:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Adiciona um item ao carrinho.
   * @param productVariantId - O ID da variação do produto.
   * @param quantity - A quantidade a ser adicionada.
   */
  addItem: async (productVariantId: string, quantity: number) => {
    set({ isLoading: true }); // Ativa o loading geral do carrinho
    try {
      const updatedCart = await cartService.addItem({
        productVariantId,
        quantity,
      });
      set({ cart: updatedCart });
      toast.success("Item adicionado ao carrinho!");
    } catch (error) {
      toast.error("Não foi possível adicionar o item.");
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Remove um item do carrinho.
   * @param cartItemId - O ID do item de carrinho a ser removido.
   */
  removeItem: async (cartItemId: string) => {
    set({ isUpdatingItem: cartItemId }); // Ativa o loading para o item específico
    try {
      const updatedCart = await cartService.removeItem(cartItemId);
      set({ cart: updatedCart });
      toast.success("Item removido do carrinho.");
    } catch (error) {
      toast.error("Falha ao remover o item.");
    } finally {
      set({ isUpdatingItem: null });
    }
  },

  /**
   * Atualiza a quantidade de um item no carrinho.
   * @param cartItemId - O ID do item a ser atualizado.
   * @param newQuantity - A nova quantidade do item.
   */
  updateItemQuantity: async (cartItemId: string, newQuantity: number) => {
    set({ isUpdatingItem: cartItemId }); // Ativa o loading para o item específico
    try {
      const updatedCart = await cartService.updateItemQuantity(cartItemId, {
        newQuantity,
      });
      set({ cart: updatedCart });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        "Falha ao atualizar a quantidade.";
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingItem: null });
    }
  },
}));
