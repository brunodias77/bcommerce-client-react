// src/components/profile/ProfilePageContent.tsx
"use client";

import React from 'react';

// Imports de Ícones e Componentes
import UserIcon from '@/icons/user-icon';
import DocumentICon from '@/icons/document-icon';
import Button from '../ui/button';
import Input from '../ui/input';
import { SectionAddress } from './section-address'; // Apenas importe o componente

export const ProfilePageContent: React.FC = () => {
    // ✅ Note que todos os useState e useEffects de endereço foram removidos daqui.
    // A responsabilidade agora é 100% do SectionAddress.
    return (
        <div className="mx-auto max-w-[1440px] flex-1 py-4 flex flex-col">
            <div className='flex items-center gap-x-2 mb-6'>
                <UserIcon color="#fec857" height={25} width={25} />
                <h2 className="text-blue-primary font-bold text-2xl uppercase">Meus Dados</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Card de Dados Básicos (permanece como está) */}
                <div className='bg-white rounded shadow-md p-8 flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <DocumentICon color='#fec857' />
                        <span className='uppercase text-blue-primary font-bold'>Dados Básicos</span>
                    </div>

                    <div className='flex gap-4 w-full'>
                        <button className='border border-yellow-primary rounded px-4 py-2 w-full'>
                            <span className='uppercase text-yellow-primary text-sm font-bold'>Alterar e-mail</span>
                        </button>
                        <button className='border border-yellow-primary rounded px-4 py-2 w-full'>
                            <span className='uppercase text-yellow-primary text-sm font-bold'>Alterar senha</span>
                        </button>
                    </div>

                    <Input id="name" name="name" label="nome completo *" placeholder="Bruno Dias" required />
                    <Input id="phone" name="phone" label="Telefone celular" placeholder="Digite seu celular" type='number' required />
                    <Input id="email" name="email" label="Email" type='email' placeholder="Digite o email" required />
                    <Input id="cpf" name="cpf" label="cpf" type='number' placeholder="Digite o cpf" required />
                    <Input id="date" name="date" label="Data de nascimento" type='date' required />

                    <div className='grid grid-cols-2 gap-4'>
                        <button className='cursor-pointer'>
                            <span className='underline uppercase'>Excluir minha conta</span>
                        </button>
                        <Button>
                            <span className='uppercase font-bold'>Salvar alterações</span>
                        </Button>
                    </div>
                </div>

                {/* Seção de Endereços, que agora cuida de si mesma */}
                <SectionAddress />
            </div>
        </div>
        // ✅ Note que os Modais também foram removidos daqui, pois já estão dentro do SectionAddress.
    );
}