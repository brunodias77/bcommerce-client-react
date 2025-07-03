import { create } from "zustand";
import { toast } from "react-toastify";
import { Address } from "@/lib/definitions";
import { addressService } from "@/services/address-service";
import { AddressPayload } from "@/lib/schemas/address-schema";

/**
 * =================================================================
 * DEFINIÇÃO DO ESTADO E AÇÕES DA STORE DE ENDEREÇOS
 * =================================================================
 */
interface AddressState {
  addresses: Address[];
  isLoading: boolean;
  isProcessing: boolean; // Um loading genérico para operações de escrita

  // --- AÇÕES ---
  fetchAddresses: () => Promise<void>;
  addAddress: (payload: AddressPayload) => Promise<void>;
  updateAddress: (addressId: string, payload: AddressPayload) => Promise<void>;
  setDefaultAddress: (address: Address) => Promise<void>;
  removeAddress: (addressId: string) => Promise<void>;
}

/**
 * =================================================================
 * CRIAÇÃO DA STORE ZUSTAND (`useAddressStore`)
 * =================================================================
 * Hook customizado para gerenciar o estado global dos endereços do usuário.
 */
export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  isLoading: true,
  isProcessing: false,

  /**
   * Busca a lista completa de endereços do usuário.
   */
  fetchAddresses: async () => {
    set({ isLoading: true });
    try {
      const userAddresses = await addressService.list();
      set({ addresses: userAddresses });
    } catch (error) {
      toast.error("Não foi possível carregar seus endereços.");
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Adiciona um novo endereço.
   */
  addAddress: async (payload: AddressPayload) => {
    set({ isProcessing: true });
    try {
      const newAddress = await addressService.add(payload);
      set((state) => ({ addresses: [...state.addresses, newAddress] }));
      toast.success("Endereço adicionado com sucesso!");
    } catch (error) {
      toast.error("Falha ao adicionar o novo endereço.");
    } finally {
      set({ isProcessing: false });
    }
  },

  /**
   * Atualiza os dados de um endereço existente.
   */
  updateAddress: async (addressId: string, payload: AddressPayload) => {
    set({ isProcessing: true });
    try {
      const updatedAddress = await addressService.update(addressId, payload);
      set((state) => ({
        addresses: state.addresses.map((addr) =>
          addr.id === addressId ? updatedAddress : addr
        ),
      }));
      toast.success("Endereço atualizado com sucesso!");
    } catch (error) {
      toast.error("Falha ao atualizar o endereço.");
    } finally {
      set({ isProcessing: false });
    }
  },

  /**
   * Define um endereço como padrão.
   */
  setDefaultAddress: async (address: Address) => {
    set({ isProcessing: true });
    // O payload é o endereço completo, mas com isDefault = true
    const payload: AddressPayload = {
      ...address,
      isDefault: true,
    };
    try {
      await addressService.update(address.id, payload);
      // Após o sucesso, recarrega a lista para garantir a consistência
      // de qual endereço é o padrão.
      await get().fetchAddresses();
      toast.success("Endereço padrão atualizado!");
    } catch (error) {
      toast.error("Falha ao definir o endereço como padrão.");
    } finally {
      set({ isProcessing: false });
    }
  },

  /**
   * Remove um endereço.
   */
  removeAddress: async (addressId: string) => {
    set({ isProcessing: true });
    try {
      await addressService.remove(addressId);
      // Atualização otimista: remove da lista localmente
      set((state) => ({
        addresses: state.addresses.filter((addr) => addr.id !== addressId),
      }));
      toast.success("Endereço removido com sucesso!");
    } catch (error) {
      toast.error("Falha ao remover o endereço.");
    } finally {
      set({ isProcessing: false });
    }
  },
}));
