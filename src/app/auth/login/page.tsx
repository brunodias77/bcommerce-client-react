/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { authService } from '@/services/auth-service';
import { clientService } from '@/services/client-service';
import { loginSchema } from '@/lib/schemas/auth-schema';
import LoginForm from '../../../components/login/login-form'; // Ajuste o caminho conforme sua estrutura

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // ✅ CORREÇÃO: Chamar cada seletor separadamente para otimizar renderizações.
    const loginAction = useAuthStore((state) => state.login);
    const setUserAction = useAuthStore((state) => state.setUser);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const validationResult = loginSchema.safeParse(data);

        if (!validationResult.success) {
            validationResult.error.errors.forEach((error) => toast.error(error.message));
            setIsLoading(false);
            return;
        }

        try {
            const { accessToken, refreshToken } = await authService.login(validationResult.data);

            // ✅ CORREÇÃO: Passando o objeto esperado pela sua ação de login na store.
            loginAction({ token: accessToken, refreshToken });

            const profileData = await clientService.getMyProfile();
            setUserAction({
                id: profileData.id,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
            });

            toast.success('Login realizado com sucesso!');
            router.push('/account');

        } catch (err: any) {
            // ✅ MELHORIA: Tratamento de erro que lê a mensagem da estrutura de erro da sua API.
            const errorMessage = err.response?.data?.errors?.[0]?.message || 'E-mail ou senha inválidos.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 w-full flex flex-col bg-[#F2F3F4]">
            <div className="container flex-1 h-full flex items-center justify-center">
                <div className='bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-y-4 min-w-[380px]'>
                    <span className="font-bold text-blue-primary">
                        Acesse sua conta
                    </span>
                    <LoginForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}