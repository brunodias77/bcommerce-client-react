import React from 'react';
import { Address } from '@/lib/definitions'; // Importe a interface Address
import PencilIcon from '@/icons/pencil-icon';
import TrashIcon from '@/icons/trash-icon';
import StarIcon from '@/icons/star-icon';

interface CardAddressProps {
    address: Address; // Recebe o objeto de endereço completo
    onDelete: (address: Address) => void;
    onEdit: (address: Address) => void; // ✅ Adicionada a prop onEdit
    onSetDefault: (address: Address) => void;
}

const CardAddress: React.FC<CardAddressProps> = ({ address, onDelete, onEdit, onSetDefault }) => {
    const isStandard = address.isDefault; // A propriedade 'isStandard' agora é dinâmica

    return (
        <div className={`w-full px-8 py-4 rounded-md transition-all ${isStandard ? 'border-l-4 border-yellow-primary bg-yellow-primary/10' : 'border-l-4 border-gray-200 bg-gray-50'}`}>
            <div className='flex items-start justify-between'>
                <div className='flex flex-col gap-y-1'>
                    {isStandard && (
                        <span className="px-2 py-0.5 bg-yellow-primary text-white text-xs font-bold rounded-full">Padrão</span>
                    )}                    <span className='font-bold text-sm text-blue-primary'>{address.type === 'Shipping' ? 'Endereço de Entrega' : 'Endereço de Cobrança'}</span>
                    <span className='text-gray-tertiary'>{address.street}</span>
                    <span className='text-gray-tertiary'>Número: {address.number}, {address.complement}</span>
                    <span className='text-gray-tertiary'>CEP: {address.postalCode} - {address.city}, {address.stateCode}</span>
                </div>
                <div className='flex items-center gap-x-4'>
                    <button className='cursor-pointer' onClick={() => onEdit(address)}>
                        <PencilIcon width={18} />
                    </button>
                    <button className='cursor-pointer' onClick={() => onDelete(address)}
                    ><TrashIcon width={18} /></button>
                </div>
            </div>

            {/* ✅ 3. Exibe o botão apenas se NÃO for o endereço padrão */}
            {!isStandard && (
                <div className='mt-3 pt-3 border-t border-gray-200'>
                    <button
                        className='flex items-center gap-x-2 text-blue-primary hover:text-yellow-primary transition-colors'
                        onClick={() => onSetDefault(address)}
                    >
                        <StarIcon width={16} height={16} />
                        <span className='text-sm font-semibold'>Tornar Padrão</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default CardAddress;