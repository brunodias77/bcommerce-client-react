"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { Address } from "@/lib/definitions";
import { addressService } from "@/services/address-service";
import { AddressSchema } from "@/lib/schemas/address-schema";

export function useAddressManager() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

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

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const setDefault = async (address: Address) => {
    setIsProcessing(true);

    // ✅ CORREÇÃO: Monta o payload exatamente como o backend espera
    // A API de update espera um payload, não a entidade completa.
    const payload: Omit<AddressSchema, "complement"> & {
      complement?: string | null;
    } = {
      type: address.type,
      postalCode: address.postalCode,
      street: address.street,
      streetNumber: address.streetNumber,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      stateCode: address.stateCode,
      isDefault: true, // A intenção é definir como padrão
    };

    try {
      // O ID vai na URL, o payload vai no corpo
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

  const remove = async (addressId: string) => {
    setIsProcessing(true);
    try {
      await addressService.remove(addressId);
      toast.success("Endereço removido com sucesso!");
      setAddresses((current) =>
        current.filter((addr) => addr.id !== addressId)
      );
    } catch (error) {
      toast.error("Falha ao remover o endereço.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    addresses,
    isLoading,
    isProcessing,
    setDefault,
    remove,
    reload: fetchAddresses,
  };
}
