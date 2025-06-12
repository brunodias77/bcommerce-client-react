// components/auth/LoginForm.tsx
import { FC } from 'react';
import Button from '@/components/ui/button';
import GoogleIcon from '@/icons/google-icon';
import FacebookIcon from '@/icons/facebook-icon';

interface LoginFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isLoading: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
            <div className="flex flex-col w-full">
                <label
                    htmlFor="email"
                    className="mb-1 text-xs font-medium text-blue-secondary"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
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
                    type="password"
                    name="password"
                    placeholder="Senha (mín. 8 caracteres)"
                    required
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
                <a href="/auth/forgot-password" className='text-gray-secondary text-xs hover:text-yellow-primary'>
                    esqueceu a senha?
                </a>
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
                não tem conta? <a href="/auth/register" className='text-yellow-primary underline'>cadastre-se</a>
            </span>
        </form>
    );
};

export default LoginForm;