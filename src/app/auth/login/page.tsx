/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/auth/login/page.tsx
'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { authService } from '@/services/auth-service';
import { clientService } from '@/services/client-service';
import { loginSchema } from '@/lib/schemas/auth-schema';
import LoginForm from '../../../components/login/login-form';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // ✅ --- CORREÇÃO: PEGUE CADA AÇÃO EM UMA CHAMADA SEPARADA ---
    // Isso evita a criação de um novo objeto a cada renderização e resolve o loop.
    const login = useAuthStore((state) => state.login);
    const setUser = useAuthStore((state) => state.setUser);

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
            // O resto da sua lógica está perfeito. Nenhuma outra alteração é necessária aqui.
            const { accessToken } = await authService.login(validationResult.data);
            login(accessToken);
            const profileData = await clientService.getMyProfile();
            setUser({
                id: profileData.id,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
            });
            toast.success('Login realizado com sucesso!');
            router.push('/account');

        } catch (err: any) {
            const errorMessage = err.response?.data?.[0]?.message || 'E-mail ou senha inválidos.';
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
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // /app/auth/login/page.tsx
// 'use client';

// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/store/auth-store';
// import { authService } from '@/services/auth-service';
// import { loginSchema } from '@/lib/schemas/auth-schema';
// import Button from '@/components/ui/button';
// import { useState } from 'react';
// import GoogleIcon from '@/icons/google-icon';
// import FacebookIcon from '@/icons/facebook-icon';
// import LoginForm from '../../../components/login/login-form'

// export default function LoginPage() {
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();
//     const loginAction = useAuthStore((state) => state.login);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const formData = new FormData(e.currentTarget);
//         const data = Object.fromEntries(formData.entries());

//         const validationResult = loginSchema.safeParse(data);

//         if (!validationResult.success) {
//             validationResult.error.errors.forEach((error) => toast.error(error.message));
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const { accessToken } = await authService.login(validationResult.data);
//             loginAction(accessToken);
//             toast.success('Login realizado com sucesso!');
//             router.push('/account');
//         } catch (err: any) {
//             const errorMessage = err.response?.data?.[0]?.message || 'E-mail ou senha inválidos.';
//             toast.error(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex-1 w-full flex flex-col bg-[#F2F3F4]">
//             <div className="container flex-1 h-full flex items-center justify-center">
//                 <div className='bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-y-4 min-w-[380px]'>
//                     <span className="font-bold text-blue-primary">
//                         Acesse sua conta
//                     </span>
//                     <LoginForm
//                         onSubmit={handleSubmit}
//                         isLoading={isLoading}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }