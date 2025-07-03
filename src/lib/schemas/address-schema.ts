import { z } from "zod";

// Enum para corresponder ao AddressType do backend
const AddressTypeEnum = z.enum(["Shipping", "Billing"]);

export const addressSchema = z.object({
  type: AddressTypeEnum,
  postalCode: z.string().length(8, { message: "O CEP deve ter 8 dígitos." }),
  street: z.string().min(1, { message: "A rua é obrigatória." }).max(150),
  streetNumber: z.string().min(1, { message: "O número é obrigatório." }).max(20),
  complement: z.string().max(100).optional().nullable(),
  neighborhood: z.string().min(1, { message: "O bairro é obrigatório." }).max(100),
  city: z.string().min(1, { message: "A cidade é obrigatória." }).max(100),
  stateCode: z.string().length(2, { message: "O estado (UF) deve ter 2 caracteres." }),
  isDefault: z.boolean().default(false),
});

// ✅ CORREÇÃO: Exportando o tipo inferido a partir do schema.
// Este é o tipo que os métodos do serviço devem usar como parâmetro.
export type AddressPayload = z.infer<typeof addressSchema>;


// import { z } from "zod";

// // ✅ CORREÇÃO: O backend espera os valores "Shipping" ou "Billing" como strings.
// const AddressTypeEnum = z.enum(["Shipping", "Billing"]);

// export const addressSchema = z.object({
//   // O backend espera o Enum como string, não como número.
//   type: AddressTypeEnum,
//   postalCode: z.string().length(8, { message: "O CEP deve ter 8 dígitos." }),
//   street: z.string().min(1, { message: "A rua é obrigatória." }).max(150),
//   // ✅ CORREÇÃO: Renomeado de 'number' para 'streetNumber' para corresponder à API.
//   streetNumber: z
//     .string()
//     .min(1, { message: "O número é obrigatório." })
//     .max(20),
//   complement: z.string().max(100).optional().nullable(),
//   neighborhood: z
//     .string()
//     .min(1, { message: "O bairro é obrigatório." })
//     .max(100),
//   city: z.string().min(1, { message: "A cidade é obrigatória." }).max(100),
//   stateCode: z
//     .string()
//     .length(2, { message: "O estado (UF) deve ter 2 caracteres." }),
//   isDefault: z.boolean().default(false),
// });

// export type AddressSchema = z.infer<typeof addressSchema>;
