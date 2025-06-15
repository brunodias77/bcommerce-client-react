// src/hooks/useAddressManager.ts
"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { Address } from "@/lib/definitions";
import { addressService } from "@/services/address-service";

export function useAddressManager() {
  // States Internos do Hook
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); // Um state de loading genérico

  // Lógica para buscar os endereços
  const fetchAddresses = useCallback(async () => {
    try {
      setIsLoading(true);
      const userAddresses = await addressService.list();
      setAddresses(userAddresses);
    } catch (error) {
      toast.error("Não foi possível carregar seus endereços.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Busca inicial
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Função para definir um endereço como padrão
  const setDefault = async (address: Address) => {
    setIsProcessing(true);
    const payload = {
      ...address,
      type: address.type === "Shipping" ? 0 : 1,
      isDefault: true,
    };
    try {
      await addressService.update(address.id, payload);
      toast.success("Endereço padrão atualizado!");
      // Atualização otimista da UI
      setAddresses((current) =>
        current.map((addr) => ({ ...addr, isDefault: addr.id === address.id }))
      );
    } catch (error) {
      toast.error("Falha ao definir o endereço como padrão.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para remover um endereço
  const remove = async (addressId: string) => {
    setIsProcessing(true);
    try {
      await addressService.remove(addressId);
      toast.success("Endereço removido com sucesso!");
      // Atualização otimista da UI
      setAddresses((current) =>
        current.filter((addr) => addr.id !== addressId)
      );
    } catch (error) {
      toast.error("Falha ao remover o endereço.");
    } finally {
      setIsProcessing(false);
    }
  };

  // O Hook retorna apenas o que o componente precisa consumir
  return {
    addresses,
    isLoading,
    isProcessing,
    setDefault,
    remove,
    reload: fetchAddresses, // Expõe a função de recarregar
  };
}
