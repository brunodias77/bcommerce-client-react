"use client";

import React, { useState, useEffect, useCallback } from 'react';

// Imports de Ícones e Componentes
import MapIcon from '@/icons/map-icon';
import UserIcon from '@/icons/user-icon';
import DocumentICon from '@/icons/document-icon';
import Button from '../ui/button';
import Input from '../ui/input';
import ModalAddress from '../profile/modal-address';
import CardAddress from '../profile/card-address';
import ConfirmationModal from '../ui/confirmation-modal';
// Imports de Serviços e Tipos
import { addressService } from '@/services/address-service';
import { Address } from '@/lib/definitions';
import { toast } from 'react-toastify';


export const ProfilePageContent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // ✅ 1. State para controlar o modal de confirmação e o endereço a ser deletado
    const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // ✅ Usamos useCallback para evitar recriar a função em cada renderização
    const fetchAddresses = useCallback(async () => {
        try {
            setIsLoading(true);
            const userAddresses = await addressService.list();
            setAddresses(userAddresses);
        } catch (error) {
            toast.error("Não foi possível carregar seus endereços.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ✅ useEffect para buscar os endereços quando o componente montar
    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    // ✅ Função para ser chamada pelo Modal, que dispara a atualização da lista
    const handleAddressAdded = () => {
        fetchAddresses();
    };

    // ✅ 2. Função para abrir o modal de confirmação
    const handleDeleteRequest = (address: Address) => {
        setAddressToDelete(address);
    };

    // ✅ 3. Função para confirmar e executar a exclusão
    const handleConfirmDelete = async () => {
        if (!addressToDelete) return;

        setIsDeleting(true);
        try {
            await addressService.remove(addressToDelete.id);
            toast.success("Endereço removido com sucesso!");

            // Atualiza a lista de endereços no estado, removendo o item deletado
            setAddresses(currentAddresses =>
                currentAddresses.filter(addr => addr.id !== addressToDelete.id)
            );
        } catch (error) {
            toast.error("Falha ao remover o endereço.");
        } finally {
            setIsDeleting(false);
            setAddressToDelete(null); // Fecha o modal
        }
    };

    return (
        <>
            <div className="mx-auto max-w-[1440px] flex-1 py-4 flex flex-col">
                <div className='flex items-center gap-x-2 mb-6'>
                    <UserIcon color="#fec857" height={25} width={25} />
                    <h2 className="text-blue-primary font-bold text-2xl uppercase">Meus Dados</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
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

                    <div className='bg-white rounded shadow-md p-8 flex flex-col gap-y-4'>
                        <div className='flex items-center gap-x-2'>
                            <MapIcon color='#fec857' />
                            <span className='uppercase text-blue-primary font-bold'>Endereços</span>
                        </div>

                        {/* ✅ Renderização dinâmica dos endereços */}
                        <div className="space-y-4 flex-1">
                            {isLoading ? (
                                <p>Carregando endereços...</p>
                            ) : addresses.length > 0 ? (
                                addresses.map(address => (
                                    <CardAddress key={address.id} address={address} onDelete={handleDeleteRequest} />
                                ))
                            ) : (
                                <p className='text-gray-500 text-center my-auto'>Nenhum endereço cadastrado.</p>
                            )}
                        </div>

                        <div className='mt-auto pt-4'>
                            <Button className='w-full' onClick={() => setIsModalOpen(true)}>
                                <span className='uppercase font-bold'>cadastrar novo endereço</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ModalAddress
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddressAdded={handleAddressAdded}
            />

            {/* ✅ 4. Renderiza o modal de confirmação */}
            <ConfirmationModal
                isOpen={!!addressToDelete}
                onClose={() => setAddressToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message={`Você tem certeza que deseja remover o endereço "${addressToDelete?.street}, ${addressToDelete?.number}"?`}
                isLoading={isDeleting}
            />
        </>
    );
}

