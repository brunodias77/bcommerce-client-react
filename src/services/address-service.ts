import { api } from "@/lib/api";
import { Address } from "@/lib/definitions";
// ✅ CORREÇÃO: Importando o tipo 'AddressPayload' em vez do schema.
import { AddressPayload } from "@/lib/schemas/address-schema";

class AddressService {
  /**
   * Busca a lista de endereços do usuário logado.
   * Mapeia para: GET /api/addresses
   */
  async list(): Promise<Address[]> {
    const { data } = await api.get<Address[]>("/addresses");
    return data;
  }

  /**
   * Adiciona um novo endereço para o usuário logado.
   * Mapeia para: POST /api/addresses
   * @param addressData - Os dados do novo endereço, validados pelo AddressSchema.
   */
  // ✅ CORREÇÃO: Usa o tipo 'AddressPayload' para o parâmetro.
  async add(addressData: AddressPayload): Promise<Address> {
    const { data } = await api.post<Address>("/addresses", addressData);
    return data;
  }

  /**
   * Atualiza um endereço existente.
   * Mapeia para: PUT /api/addresses/{id}
   * @param id - O ID do endereço a ser atualizado.
   * @param addressData - Os novos dados do endereço.
   */
  // ✅ CORREÇÃO: Usa o tipo 'AddressPayload' para o parâmetro.
  async update(id: string, addressData: AddressPayload): Promise<Address> {
    const { data } = await api.put<Address>(`/addresses/${id}`, addressData);
    return data;
  }

  /**
   * Remove um endereço.
   * Mapeia para: DELETE /api/addresses/{id}
   * @param id - O ID do endereço a ser removido.
   */
  async remove(id: string): Promise<void> {
    await api.delete(`/addresses/${id}`);
  }
}

export const addressService = new AddressService();
