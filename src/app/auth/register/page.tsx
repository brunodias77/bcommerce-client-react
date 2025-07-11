
'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { authService } from '@/services/auth-service';
import { registerSchema } from '@/lib/schemas/auth-schema';
import RegisterForm from '@/components/register/register-form'; // Ajuste o caminho conforme sua estrutura

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // ✅ CORREÇÃO: O valor do checkbox é 'on' ou ausente. Convertemos para booleano.
        const processedData = {
            ...data,
            newsletterOptIn: formData.get('newsletterOptIn') === 'on',
        };

        const validationResult = registerSchema.safeParse(processedData);

        if (!validationResult.success) {
            // Exibe os erros de validação do Zod para o usuário
            validationResult.error.errors.forEach((error) => {
                toast.error(error.message);
            });
            setIsLoading(false);
            return;
        }

        try {
            await authService.register(validationResult.data);
            toast.success('Conta criada com sucesso! Verifique seu e-mail.');
            setUserEmail(validationResult.data.email);
            setIsSuccess(true);
        } catch (err: any) {
            // ✅ CORREÇÃO: Tratamento de erro alinhado com a estrutura de erro da sua API.
            // A API retorna um objeto { errors: [...] }, então acessamos a mensagem corretamente.
            const errorMessage = err.response?.data?.errors?.[0]?.message || 'Falha ao realizar o cadastro.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex-1 w-full flex items-center justify-center bg-[#F2F3F4]">
                <div className="container mx-auto p-4 text-center bg-white rounded-lg shadow-md max-w-md">
                    <h1 className="text-2xl font-bold text-green-600">Conta Criada!</h1>
                    <p className="mt-4">
                        Enviamos um link de verificação para o seu e-mail: <strong>{userEmail}</strong>
                    </p>
                    <p className="mt-2">Por favor, verifique sua caixa de entrada para ativar sua conta.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full flex flex-col bg-[#F2F3F4]">
            <div className="container flex-1 h-full flex items-center justify-center">
                <div className='bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-y-4 min-w-[380px]'>
                    <span className="font-bold text-blue-primary">Crie sua conta</span>
                    <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}



// 'use client';

// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { authService } from '@/services/auth-service';
// import { registerSchema } from '@/lib/schemas/auth-schema';
// import Button from '@/components/ui/button';
// import GoogleIcon from '@/icons/google-icon';
// import FacebookIcon from '@/icons/facebook-icon';
// import RegisterForm from '@/components/register/register-form';

// export default function RegisterPage() {


//     const [isSuccess, setIsSuccess] = useState(false);
//     const [email, setEmail] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const formData = new FormData(e.currentTarget);
//         const data = Object.fromEntries(formData.entries());

//         const processedData = {
//             ...data,
//             newsletterOptIn: formData.get('newsletterOptIn') === 'on',
//         };

//         const validationResult = registerSchema.safeParse(processedData);

//         if (!validationResult.success) {
//             validationResult.error.errors.forEach((error) => {
//                 toast.error(error.message);
//             });
//             setIsLoading(false);
//             return;
//         }

//         try {
//             await authService.register(validationResult.data);
//             toast.success('Registro realizado com sucesso!');
//             setEmail(validationResult.data.email);
//             setIsSuccess(true);
//         } catch (err: any) {
//             const errorMessages = err.response?.data?.map((e: any) => e.message).join(', ') || 'Falha ao registrar.';
//             toast.error(errorMessages);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isSuccess) {
//         return (
//             <div className="container mx-auto p-4">
//                 <h1 className="text-2xl font-bold text-green-600">Conta Criada!</h1>
//                 <p className="mt-2">
//                     Enviamos um link de verificação para o seu e-mail: <strong>{email}</strong>
//                 </p>
//                 <p>Por favor, verifique sua caixa de entrada para ativar sua conta.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex-1 w-full flex flex-col bg-[#F2F3F4]">
//             <div className="container flex-1 h-full flex items-center justify-center">
//                 <div className='bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-y-4 min-w-[380px]'>
//                     <span className="font-bold text-blue-primary">Crie sua conta</span>
//                     <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
//                 </div>
//             </div>
//         </div>
//     );
// }

