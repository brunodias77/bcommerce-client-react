import { z } from "zod";

export const addressSchema = z.object({
  type: z.enum(["Shipping", "Billing"], {
    required_error: "O tipo é obrigatório.",
  }),
  postalCode: z.string().length(8, { message: "O CEP deve ter 8 dígitos." }),
  street: z.string().min(1, { message: "A rua é obrigatória." }).max(150),
  number: z.string().min(1, { message: "O número é obrigatório." }).max(20),
  complement: z.string().max(100).optional(),
  neighborhood: z
    .string()
    .min(1, { message: "O bairro é obrigatório." })
    .max(100),
  city: z.string().min(1, { message: "A cidade é obrigatória." }).max(100),
  stateCode: z
    .string()
    .length(2, { message: "O estado (UF) deve ter 2 caracteres." }),
  isDefault: z.boolean().default(false),
});

export type AddressSchema = z.infer<typeof addressSchema>;
