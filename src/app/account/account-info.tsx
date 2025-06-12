'use client';

import { useAuthStore } from '@/store/auth-store';

export default function AccountInfo() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <p className="text-gray-500">Usuário não logado</p>;
    }

    return (
        <div className="space-y-2">
            <p><strong>Nome:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}
