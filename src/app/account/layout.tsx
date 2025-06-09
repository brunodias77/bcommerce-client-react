"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Este é o tipo de retorno do endpoint GET /api/clients/me
// Baseado em CreateClientOutput.cs
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, user, setUser, logout } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    // Se não há token, redireciona para o login
    if (!token) {
      router.replace("/login");
      return;
    }

    // Se há token mas não temos os dados do usuário, busca na API
    if (token && !user) {
      const fetchUserProfile = async () => {
        try {
          const { data } = await api.get<UserProfile>("/clients/me");
          setUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          });
        } catch (error) {
          // Se o token for inválido, o backend retornará 401 Unauthorized
          toast.error("Sua sessão expirou. Por favor, faça login novamente.");
          logout(); // Limpa a store
          router.replace("/login");
        }
      };

      fetchUserProfile();
    }
  }, [token, user, router, setUser, logout]);

  // Enquanto verifica o token/usuário, pode-se mostrar um loader
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} className={`py-2 px-4 rounded ${pathname === href ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
      {children}
    </Link>
  );
  // Se tudo estiver certo, renderiza a página da conta
  return (
    <div>
      <header className="bg-white p-4 border-b">
        <div className="container mx-auto flex justify-between">
          <div>
            <h1 className="text-xl font-bold">Minha Conta</h1>
            <p className="text-sm text-gray-600">Bem-vindo(a), {user.firstName}!</p>
          </div>
          <button onClick={() => { useAuthStore.getState().logout(); router.push('/'); }} className="text-red-500 font-semibold">
            Sair
          </button>
        </div>
      </header>
      <div className="container mx-auto p-4 flex gap-8">
        <aside className="w-1/4">
          <nav className="flex flex-col gap-2 border-r pr-4">
            <NavLink href="/account">Visão Geral</NavLink>
            <NavLink href="/account/orders">Meus Pedidos</NavLink>
            <NavLink href="/account/addresses">Meus Endereços</NavLink>
          </nav>
        </aside>
        <main className="w-3/4">{children}</main>
      </div>
    </div>
  );
}
