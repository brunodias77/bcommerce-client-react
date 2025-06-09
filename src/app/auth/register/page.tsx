/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from 'react-toastify';
import { authService } from '@/services/auth-service';
import { registerSchema } from '@/lib/schemas/auth-schema';
import { useState } from 'react';

export default function RegisterPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Converte o valor do checkbox para boolean
        const processedData = {
            ...data,
            newsletterOptIn: formData.get('newsletterOptIn') === 'on',
        };

        // 1. Validação com Zod
        const validationResult = registerSchema.safeParse(processedData);

        if (!validationResult.success) {
            // Mostra um toast de erro para cada campo inválido
            validationResult.error.errors.forEach((error) => {
                toast.error(error.message);
            });
            return;
        }

        // 2. Envio com FormData
        try {
            // Passa o objeto validado, não o FormData
            await authService.register(validationResult.data);
            toast.success('Registro realizado com sucesso!');
            setEmail(validationResult.data.email);
            setIsSuccess(true);
        } catch (err: any) {
            const errorMessages = err.response?.data?.map((e: any) => e.message).join(', ') || 'Falha ao registrar.';
            toast.error(errorMessages);
        }
    };

    // Mensagem de sucesso após o registro
    if (isSuccess) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold text-green-600">Conta Criada!</h1>
                <p className="mt-2">
                    Enviamos um link de verificação para o seu e-mail: <strong>{email}</strong>
                </p>
                <p>Por favor, verifique sua caixa de entrada para ativar sua conta.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>
            {/* O evento agora passa o HTMLFormElement para o handleSubmit */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input name="firstName" placeholder="Nome" required className="p-2 border rounded" />
                <input name="lastName" placeholder="Sobrenome" required className="p-2 border rounded" />
                <input type="email" name="email" placeholder="E-mail" required className="p-2 border rounded" />
                <input name="phoneNumber" placeholder="Telefone" required className="p-2 border rounded" />
                <input type="password" name="password" placeholder="Senha (mín. 8 caracteres)" required className="p-2 border rounded" />

                <label className="flex items-center gap-2">
                    <input type="checkbox" name="newsletterOptIn" defaultChecked />
                    Desejo receber novidades por e-mail
                </label>

                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Registrar
                </button>
            </form>
        </div>
    );
}