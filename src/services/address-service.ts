import { api } from "@/lib/api";
import { Address } from "@/lib/definitions";
import { AddressSchema } from "@/lib/schemas/address-schema";

class AddressService {
  async list(): Promise<Address[]> {
    const { data } = await api.get<Address[]>("/addresses");
    return data;
  }

  async add(addressData: AddressSchema): Promise<Address> {
    const { data } = await api.post<Address>("/addresses", addressData);
    return data;
  }

  // O endpoint PUT precisa do ID e dos dados do payload
  async update(id: string, addressData: AddressSchema): Promise<Address> {
    const { data } = await api.put<Address>(`/addresses/${id}`, addressData);
    return data;
  }

  async remove(id: string): Promise<void> {
    await api.delete(`/addresses/${id}`);
  }
}

export const addressService = new AddressService();
