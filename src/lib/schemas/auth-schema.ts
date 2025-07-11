import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "O nome é obrigatório." }).max(100),
  lastName: z
    .string()
    .min(1, { message: "O sobrenome é obrigatório." })
    .max(155),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  phoneNumber: z
    .string()
    .min(10, { message: "O telefone deve ter pelo menos 10 dígitos." })
    .max(20),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
  newsletterOptIn: z.boolean().default(true),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

// ✅ CORREÇÃO: Exportando os tipos inferidos para uso no serviço.
export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
