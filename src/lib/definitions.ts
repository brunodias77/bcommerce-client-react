// Baseado em AddressOutput.cs
export interface Address {
  id: string;
  clientId: string;
  type: "Shipping" | "Billing";
  postalCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  stateCode: string;
  isDefault: boolean;
}
