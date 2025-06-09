/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { authService } from '@/services/auth-service';
import { loginSchema } from '@/lib/schemas/auth-schema';

export default function LoginPage() {
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Entrar</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input type="email" name="email" placeholder="E-mail" required className="p-2 border rounded" />
                <input type="password" name="password" placeholder="Senha" required className="p-2 border rounded" />

                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Entrar
                </button>
            </form>
        </div>
    );
}