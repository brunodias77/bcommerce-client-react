//app/account/page.tsx
"use client";

import { useAuthStore } from "@/store/auth-store";
import AccountInfo from "../../components/account/account-info";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    useEffect(() => {
        // Se o token não existir, redireciona para a página de login
        if (!token) {
            router.push('/auth/login');
        }
    }, [token, router]);

    // Só renderiza a página se o token existir
    if (!token) {
        // Pode retornar um loader ou null para evitar piscar a tela
        return <div>Carregando...</div>;
    }

    return (
        <div className="h-full">
            {/* O conteúdo da página, como o seu ProfilePageContent, viria aqui */}
            <AccountInfo />
        </div>
    );
}