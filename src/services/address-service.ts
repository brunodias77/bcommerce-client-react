import { api } from "@/lib/api";
import { Address } from "@/lib/definitions";
import { AddressSchema } from "@/lib/schemas/address-schema";

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
  async add(addressData: AddressSchema): Promise<Address> {
    const { data } = await api.post<Address>("/addresses", addressData);
    return data;
  }

  /**
   * Atualiza um endereço existente.
   * Mapeia para: PUT /api/addresses/{id}
   * @param id - O ID do endereço a ser atualizado.
   * @param addressData - Os novos dados do endereço.
   */
  async update(id: string, addressData: AddressSchema): Promise<Address> {
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
