/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { authService } from '@/services/auth-service';
import { registerSchema } from '@/lib/schemas/auth-schema';

// 1. Importe o seu componente Button e os ícones
import Button from '@/components/ui/button'; // Ajuste o caminho se necessário
import GoogleIcon from '@/icons/google-icon';
import FacebookIcon from '@/icons/facebook-icon';

export default function RegisterPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');
    // 2. Adicione o estado de carregamento
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Ativa o estado de carregamento

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const processedData = {
            ...data,
            newsletterOptIn: formData.get('newsletterOptIn') === 'on',
        };

        const validationResult = registerSchema.safeParse(processedData);

        if (!validationResult.success) {
            validationResult.error.errors.forEach((error) => {
                toast.error(error.message);
            });
            setIsLoading(false); // Desativa o carregamento em caso de erro
            return;
        }

        try {
            await authService.register(validationResult.data);
            toast.success('Registro realizado com sucesso!');
            setEmail(validationResult.data.email);
            setIsSuccess(true);
        } catch (err: any) {
            const errorMessages = err.response?.data?.map((e: any) => e.message).join(', ') || 'Falha ao registrar.';
            toast.error(errorMessages);
        } finally {
            setIsLoading(false); // Garante que o carregamento seja desativado ao final
        }
    };

    if (isSuccess) {
        // ... (código da tela de sucesso permanece o mesmo)
        return (
            <div className="container mx-auto p-4 ">
                <h1 className="text-2xl font-bold text-green-600">Conta Criada!</h1>
                <p className="mt-2">
                    Enviamos um link de verificação para o seu e-mail: <strong>{email}</strong>
                </p>
                <p>Por favor, verifique sua caixa de entrada para ativar sua conta.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full flex flex-col bg-[#F2F3F4]">
            <div className="container flex-1 h-full flex items-center justify-center">
                <div className='bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-y-4 min-w-[380px]'>
                    <span className="font-bold text-blue-primary">Crie sua conta</span>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                        {/* ... (inputs do formulário permanecem os mesmos) ... */}
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="firstName"
                                className="mb-1 text-xs font-medium text-blue-secondary"
                            >
                                Nome
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                placeholder="Nome"
                                required
                                className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="lastName"
                                className="mb-1 text-xs  font-medium text-blue-secondary"
                            >
                                Sobrenome
                            </label>
                            <input
                                id="lastName"
                                name="lastName" placeholder="Sobrenome" required
                                className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
                            />
                        </div>
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
                                htmlFor="phoneNumber"
                                className="mb-1 text-xs  font-medium text-blue-secondary"
                            >
                                Telefone
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber" placeholder="Telefone" required
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
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="newsletterOptIn" defaultChecked />
                            <span className='text-gray-primary text-xs'>Desejo receber novidades por e-mail</span>
                        </label>

                        {/* 3. Botão de registro substituído */}
                        <Button type="submit" variant="secondary" fullWidth isLoading={isLoading}>
                            Registrar
                        </Button>

                        <span className='text-center text-xs text-gray-secondary'>ou se inscreva-se com</span>

                        {/* 4. Botões de social login substituídos */}
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
                            Já tem uma conta? <a href="/auth/login" className='text-yellow-primary underline'>Entre agora</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { toast } from 'react-toastify';
// import { authService } from '@/services/auth-service';
// import { registerSchema } from '@/lib/schemas/auth-schema';
// import { useState } from 'react';
// import GoogleIcon from '@/icons/google-icon';
// import FacebookIcon from '@/icons/facebook-icon';

// export default function RegisterPage() {
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [email, setEmail] = useState('');

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const formData = new FormData(e.currentTarget);
//         const data = Object.fromEntries(formData.entries());

//         // Converte o valor do checkbox para boolean
//         const processedData = {
//             ...data,
//             newsletterOptIn: formData.get('newsletterOptIn') === 'on',
//         };

//         // 1. Validação com Zod
//         const validationResult = registerSchema.safeParse(processedData);

//         if (!validationResult.success) {
//             // Mostra um toast de erro para cada campo inválido
//             validationResult.error.errors.forEach((error) => {
//                 toast.error(error.message);
//             });
//             return;
//         }

//         // 2. Envio com FormData
//         try {
//             // Passa o objeto validado, não o FormData
//             await authService.register(validationResult.data);
//             toast.success('Registro realizado com sucesso!');
//             setEmail(validationResult.data.email);
//             setIsSuccess(true);
//         } catch (err: any) {
//             const errorMessages = err.response?.data?.map((e: any) => e.message).join(', ') || 'Falha ao registrar.';
//             toast.error(errorMessages);
//         }
//     };

//     // Mensagem de sucesso após o registro
//     if (isSuccess) {
//         return (
//             <div className="container mx-auto p-4 ">
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
//                     <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
//                         <div className="flex flex-col w-full">
//                             <label
//                                 htmlFor="firstName"
//                                 className="mb-1 text-xs font-medium text-blue-secondary"
//                             >
//                                 Nome
//                             </label>
//                             <input
//                                 id="firstName"
//                                 name="firstName"
//                                 placeholder="Nome"
//                                 required
//                                 className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
//                             />
//                         </div>
//                         <div className="flex flex-col w-full">
//                             <label
//                                 htmlFor="firstName"
//                                 className="mb-1 text-xs  font-medium text-blue-secondary"
//                             >
//                                 Sobrenome
//                             </label>
//                             <input
//                                 name="lastName" placeholder="Sobrenome" required
//                                 className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
//                             />
//                         </div>
//                         <div className="flex flex-col w-full">
//                             <label
//                                 htmlFor="firstName"
//                                 className="mb-1 text-xs  font-medium text-blue-secondary"
//                             >
//                                 Email
//                             </label>
//                             <input
//                                 type="email" name="email" placeholder="E-mail" required
//                                 className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
//                             />
//                         </div>
//                         <div className="flex flex-col w-full">
//                             <label
//                                 htmlFor="firstName"
//                                 className="mb-1 text-xs  font-medium text-blue-secondary"
//                             >
//                                 Telefone
//                             </label>
//                             <input
//                                 name="phoneNumber" placeholder="Telefone" required
//                                 className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
//                             />
//                         </div>
//                         <div className="flex flex-col w-full">
//                             <label
//                                 htmlFor="firstName"
//                                 className="mb-1 text-xs font-medium text-blue-secondary"
//                             >
//                                 Senha
//                             </label>
//                             <input
//                                 type="password" name="password" placeholder="Senha (mín. 8 caracteres)" required
//                                 className="p-2 rounded bg-[#F2F3F4] text-gray-primary"
//                             />
//                         </div>
//                         <label className="flex items-center gap-2">
//                             <input type="checkbox" name="newsletterOptIn" defaultChecked />
//                             <span className='text-gray-primary text-xs'>Desejo receber novidades por e-mail</span>
//                         </label>

//                         <button type="submit" className="bg-yellow-primary text-white p-2 rounded hover:bg-yellow-secondary cursor-pointer">
//                             Registrar
//                         </button>
//                         <span className='text-center text-xs text-gray-secondary'>ou se inscreva-se com</span>
//                         <div className='flex items-center gap-x-4  w-full'>
//                             <button className='w-full flex items-center gap-x-4 border border-yellow-primary px-4 py-2 rounded'>
//                                 <GoogleIcon />
//                                 <span className='text-blue-primary'>Google</span>
//                             </button>
//                             <button className='w-full flex items-center gap-x-4 border border-yellow-primary px-4 py-2 rounded'>
//                                 <FacebookIcon />
//                                 <span className='text-blue-primary'>Facebook</span>
//                             </button>
//                         </div>
//                         <span className='text-gray-secondary text-center text-xs'>já tem uma conta? <a href="/auth/login" className='text-yellow-primary underline'>entre agora</a></span>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }