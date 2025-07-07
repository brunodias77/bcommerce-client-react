/* eslint-disable @typescript-eslint/no-explicit-any */
// file: src/hooks/use-cart.ts

import { create } from "zustand";
import { toast } from "react-toastify";
import { Cart } from "@/lib/definitions";
import { cartService } from "@/services/cart-service";
import { handleApiError } from "@/lib/handle-api-error";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isUpdatingItem: string | null;

  // --- AÇÕES ---
  getCart: () => Promise<void>;
  addItem: (productVariantId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateItemQuantity: (
    cartItemId: string,
    newQuantity: number
  ) => Promise<void>;
}

export const useCart = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  isUpdatingItem: null,

  getCart: async () => {
    try {
      if (!get().isLoading) set({ isLoading: true });
      const cartData = await cartService.getCart();
      set({ cart: cartData });
    } catch (error) {
      console.error("Falha ao buscar o carrinho:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (productVariantId: string, quantity: number) => {
    // Previne múltiplos cliques enquanto uma requisição está em andamento.
    if (get().isLoading) return;

    set({ isLoading: true });

    try {
      const updatedCart = await cartService.addItem({
        productVariantId,
        quantity,
      });
      set({ cart: updatedCart });
      toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      // Usa o helper para obter uma mensagem de erro amigável.
      const friendlyError = handleApiError(error);
      toast.error(friendlyError.message);
      console.error("Falha ao adicionar item:", friendlyError);
    } finally {
      // ✅ PONTO CRÍTICO: Este bloco executa SEMPRE,
      // garantindo que o estado de loading seja desativado.
      set({ isLoading: false });
    }
  },

  /**
   * Remove um item com atualização otimista.
   */
  removeItem: async (cartItemId: string) => {
    const previousCart = get().cart; // 1. Salva o estado anterior
    if (!previousCart) return;

    // 2. Atualiza a UI imediatamente (Optimistic Update)
    const newItems = previousCart.items.filter(
      (item) => item.cartItemId !== cartItemId
    );
    set({ cart: { ...previousCart, items: newItems } });

    try {
      // 3. Tenta sincronizar com o backend
      await cartService.removeItem(cartItemId);
    } catch (error: any) {
      // 4. Se falhar, reverte o estado e mostra o erro
      set({ cart: previousCart });
      toast.error(error.message || "Falha ao remover o item.");
    }
  },

  /**
   * Atualiza a quantidade com atualização otimista.
   */
  updateItemQuantity: async (cartItemId: string, newQuantity: number) => {
    const previousCart = get().cart; // 1. Salva o estado anterior
    if (!previousCart) return;

    // 2. Atualiza a UI imediatamente (Optimistic Update)
    const newItems = previousCart.items.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    set({
      cart: { ...previousCart, items: newItems },
      isUpdatingItem: cartItemId,
    });

    try {
      // 3. Sincroniza com o backend
      const updatedCart = await cartService.updateItemQuantity(cartItemId, {
        newQuantity,
      });
      set({ cart: updatedCart }); // Sincroniza o estado com a resposta final da API
    } catch (error: any) {
      // 4. Em caso de erro, reverte
      set({ cart: previousCart });
      toast.error(error.message || "Falha ao atualizar a quantidade.");
    } finally {
      set({ isUpdatingItem: null });
    }
  },
}));

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";
// import { toast } from "react-toastify";
// import { Cart } from "@/lib/definitions";
// import { cartService } from "@/services/cart-service";

// /**
//  * =================================================================
//  * DEFINIÇÃO DO ESTADO E AÇÕES DA STORE DO CARRINHO
//  * =================================================================
//  */
// interface CartState {
//   cart: Cart | null;
//   isLoading: boolean;
//   isUpdatingItem: string | null; // Armazena o ID do item que está sendo atualizado

//   // --- AÇÕES ---
//   getCart: () => Promise<void>;
//   addItem: (productVariantId: string, quantity: number) => Promise<void>;
//   removeItem: (cartItemId: string) => Promise<void>;
//   updateItemQuantity: (
//     cartItemId: string,
//     newQuantity: number
//   ) => Promise<void>;
// }

// /**
//  * =================================================================
//  * CRIAÇÃO DA STORE ZUSTAND (`useCartStore`)
//  * =================================================================
//  * Hook customizado para gerenciar o estado global do carrinho.
//  */
// export const useCartStore = create<CartState>((set) => ({
//   cart: null,
//   isLoading: true, // Inicia como true para a busca inicial
//   isUpdatingItem: null,

//   /**
//    * Busca o carrinho do usuário na API e atualiza o estado.
//    * Geralmente chamado uma vez quando a aplicação é carregada.
//    */
//   getCart: async () => {
//     try {
//       set({ isLoading: true });
//       const cartData = await cartService.getCart();
//       set({ cart: cartData });
//     } catch (error) {
//       // Não mostra um toast aqui para não poluir a tela no carregamento inicial.
//       // O componente que chamar pode tratar o erro, se necessário.
//       console.error("Falha ao buscar o carrinho:", error);
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   /**
//    * Adiciona um item ao carrinho.
//    * @param productVariantId - O ID da variação do produto.
//    * @param quantity - A quantidade a ser adicionada.
//    */
//   addItem: async (productVariantId: string, quantity: number) => {
//     set({ isLoading: true }); // Ativa o loading geral do carrinho
//     try {
//       const updatedCart = await cartService.addItem({
//         productVariantId,
//         quantity,
//       });
//       set({ cart: updatedCart });
//       toast.success("Item adicionado ao carrinho!");
//     } catch (error) {
//       toast.error("Não foi possível adicionar o item.");
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   /**
//    * Remove um item do carrinho.
//    * @param cartItemId - O ID do item de carrinho a ser removido.
//    */
//   removeItem: async (cartItemId: string) => {
//     set({ isUpdatingItem: cartItemId }); // Ativa o loading para o item específico
//     try {
//       const updatedCart = await cartService.removeItem(cartItemId);
//       set({ cart: updatedCart });
//       toast.success("Item removido do carrinho.");
//     } catch (error) {
//       toast.error("Falha ao remover o item.");
//     } finally {
//       set({ isUpdatingItem: null });
//     }
//   },

//   /**
//    * Atualiza a quantidade de um item no carrinho.
//    * @param cartItemId - O ID do item a ser atualizado.
//    * @param newQuantity - A nova quantidade do item.
//    */
//   updateItemQuantity: async (cartItemId: string, newQuantity: number) => {
//     set({ isUpdatingItem: cartItemId }); // Ativa o loading para o item específico
//     try {
//       const updatedCart = await cartService.updateItemQuantity(cartItemId, {
//         newQuantity,
//       });
//       set({ cart: updatedCart });
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.errors?.[0]?.message ||
//         "Falha ao atualizar a quantidade.";
//       toast.error(errorMessage);
//     } finally {
//       set({ isUpdatingItem: null });
//     }
//   },
// }));
