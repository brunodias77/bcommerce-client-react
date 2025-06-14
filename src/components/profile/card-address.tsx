import React from 'react';
import { Address } from '@/lib/definitions'; // Importe a interface Address
import PencilIcon from '@/icons/pencil-icon';
import TrashIcon from '@/icons/trash-icon';

interface CardAddressProps {
    address: Address; // Recebe o objeto de endereço completo
    onDelete: (address: Address) => void;
}

const CardAddress: React.FC<CardAddressProps> = ({ address, onDelete }) => {
    const isStandard = address.isDefault; // A propriedade 'isStandard' agora é dinâmica

    return (
        <div className={`w-full px-8 py-4 rounded-md transition-all ${isStandard ? 'border-l-4 border-yellow-primary bg-yellow-primary/10' : 'border-l-4 border-gray-200 bg-gray-50'}`}>
            <div className='flex items-start justify-between'>
                <div className='flex flex-col gap-y-1'>
                    {/* Exibe o tipo do endereço (Entrega ou Cobrança) */}
                    <span className='font-bold text-sm text-blue-primary'>{address.type === 'Shipping' ? 'Endereço de Entrega' : 'Endereço de Cobrança'}</span>
                    <span className='text-gray-tertiary'>{address.street}</span>
                    <span className='text-gray-tertiary'>Número: {address.number}, {address.complement}</span>
                    <span className='text-gray-tertiary'>CEP: {address.postalCode} - {address.city}, {address.stateCode}</span>
                </div>
                <div className='flex items-center gap-x-4'>
                    <button className='cursor-pointer'><PencilIcon width={18} /></button>
                    <button className='cursor-pointer' onClick={() => onDelete(address)}
                    ><TrashIcon width={18} /></button>
                </div>
            </div>
        </div>
    );
}

export default CardAddress;