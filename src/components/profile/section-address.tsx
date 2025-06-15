"use client";

import React, { useState } from 'react';
import { useAddressManager } from '@/hooks/useAddressManager';

import MapIcon from '@/icons/map-icon';
import Button from '../ui/button';
import CardAddress from './card-address';
import ModalAddress from './modal-address';
import ConfirmationModal from '../ui/confirmation-modal';
import { Address } from '@/lib/definitions';

export const SectionAddress: React.FC = () => {
    // 1. O Hook gerencia toda a lógica de dados (buscar, deletar, etc.)
    const { addresses, isLoading, isProcessing, setDefault, remove, reload } = useAddressManager();

    // 2. O componente gerencia apenas o estado da UI (quais modais estão abertos)
    const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
    const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Função para confirmar a exclusão
    const handleConfirmDelete = async () => {
        if (addressToDelete) {
            await remove(addressToDelete.id);
        }
        setAddressToDelete(null); // Fecha o modal de confirmação
    };

    // Função para fechar o modal de criação/edição
    const closeModal = () => {
        setIsAddModalOpen(false);
        setAddressToEdit(null);
    };

    return (
        <>
            <div className='bg-white rounded shadow-md p-8 flex flex-col gap-y-4 h-full'>
                <div className='flex items-center gap-x-2'>
                    <MapIcon color='#fec857' />
                    <span className='uppercase text-blue-primary font-bold'>Endereços</span>
                </div>

                <div className="space-y-4 flex-1">
                    {isLoading ? (
                        <p>Carregando endereços...</p>
                    ) : addresses.length > 0 ? (
                        addresses.map(address => (
                            <CardAddress
                                key={address.id}
                                address={address}
                                onDelete={() => setAddressToDelete(address)}
                                onEdit={() => setAddressToEdit(address)}
                                onSetDefault={setDefault}
                            />
                        ))
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <p className='text-gray-500 text-center'>Nenhum endereço cadastrado.</p>
                        </div>
                    )}
                </div>

                <div className='mt-auto pt-4'>
                    <Button className='w-full' onClick={() => setIsAddModalOpen(true)}>
                        <span className='uppercase font-bold'>cadastrar novo endereço</span>
                    </Button>
                </div>
            </div>

            {/* Modais que são controlados por este componente */}
            {(isAddModalOpen || addressToEdit) && (
                <ModalAddress
                    isOpen={true}
                    onClose={closeModal}
                    onSuccess={reload}
                    initialData={addressToEdit}
                />
            )}

            <ConfirmationModal
                isOpen={!!addressToDelete}
                onClose={() => setAddressToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message={`Você tem certeza que deseja remover o endereço "${addressToDelete?.street}, ${addressToDelete?.number}"?`}
                isLoading={isProcessing}
            />
        </>
    );
}


