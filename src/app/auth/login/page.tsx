/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { authService } from '@/services/auth-service';
import { loginSchema } from '@/lib/schemas/auth-schema';
import Button from '@/components/ui/button';
import { useState } from 'react';
import GoogleIcon from '@/icons/google-icon';
import FacebookIcon from '@/icons/facebook-icon';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const loginAction = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const validationResult = loginSchema.safeParse(data);

        if (!validationResult.success) {
            validationResult.error.errors.forEach((error) => toast.error(error.message));
            return;
        }

        try {
            // Agora passamos o objeto validado 'validationResult.data' diretamente
            setIsLoading(true); // <-- ESSENCIAL
            const { accessToken } = await authService.login(validationResult.data);
            loginAction(accessToken);
            toast.success('Login realizado com sucesso!');
            router.push('/account');
        } catch (err: any) {
            const errorMessage = err.response?.data?.[0]?.message || 'E-mail ou senha inválidos.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex-1 w-full flex flex-col bg-[#F2F3F4]">
            <div className="container flex-1 h-full flex items-center justify-center">
                <div className='bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-y-4 min-w-[380px]'>
                    <span className="font-bold text-blue-primary">
                        Acesse sua conta
                    </span>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="email"
                                className="mb-1 text-xs  font-medium text-blue-secondary"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email" name="email" placeholder="E-mail" required
                                className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="password"
                                className="mb-1 text-xs font-medium text-blue-secondary"
                            >
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password" name="password" placeholder="Senha (mín. 8 caracteres)" required
                                className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="newsletterOptIn"
                                    defaultChecked
                                    className="accent-yellow-primary w-4 h-4"
                                />
                                <span className='text-gray-primary text-xs'>lembrar</span>
                            </label>
                            <a href="/auth/register" className='text-gray-secondary text-xs hover:text-yellow-primary'>esqueceu a senha?</a>
                        </div>
                        <Button type="submit" variant="secondary" fullWidth isLoading={isLoading}>
                            Entrar
                        </Button>
                        <span className='text-gray-secondary text-xs text-center'>ou inscreva-se com</span>
                        <div className='flex items-center gap-x-4 w-full'>
                            <Button
                                type="button"
                                fullWidth
                                iconLeft={<GoogleIcon />}
                                // Usamos `className` para um estilo customizado que não está nas variantes padrão
                                className="!bg-transparent border border-yellow-primary text-blue-primary hover:bg-yellow-50/50"
                            >
                                Google
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                iconLeft={<FacebookIcon />}
                                className="!bg-transparent border border-yellow-primary text-blue-primary hover:bg-yellow-50/50"
                            >
                                Facebook
                            </Button>

                        </div>
                        <span className='text-gray-secondary text-center text-xs'>
                            não tem conta? <a href="/auth/login" className='text-yellow-primary underline'>cadastre-se</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}