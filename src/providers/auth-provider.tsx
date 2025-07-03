'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { clientService } from '@/services/client-service';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { token, user, setUser, logout } = useAuthStore();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initializeSession = async () => {
            // Se há um token no localStorage mas não há usuário na store,
            // significa que a página foi recarregada.
            if (token && !user) {
                try {
                    // Busca os dados do perfil usando o token persistido.
                    const profileData = await clientService.getMyProfile();
                    setUser(profileData);
                } catch (error) {
                    // Se a busca falhar (ex: token expirado), limpa a sessão.
                    console.error("Falha na sessão, fazendo logout:", error);
                    logout();
                }
            }
            setIsInitializing(false);
        };

        initializeSession();
    }, [token, user, setUser, logout]);

    // Exibe uma tela de loading enquanto a sessão está sendo verificada
    // para evitar o "flash" da mensagem "Usuário não logado".
    if (isInitializing) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Inicializando sessão...</p>
            </div>
        );
    }

    return <>{children}</>;
}