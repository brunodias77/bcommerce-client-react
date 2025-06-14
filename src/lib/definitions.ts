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
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: Date | null;
  phoneNumber: string;
  newsletterOptIn: boolean;
  createdAt: Date;
}

// Interface para a resposta da verificação de e-mail
export interface VerifyEmailResponse {
  message: string;
}
