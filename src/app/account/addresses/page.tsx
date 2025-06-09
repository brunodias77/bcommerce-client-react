'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addressService } from '@/services/address-service';
import { Address } from '@/lib/definitions';

// Componente simples para exibir o endereço. Poderia ser movido para /components/
const AddressCard = ({ address, onDelete }: { address: Address, onDelete: (id: string) => void }) => (
    <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold">{address.street}, {address.number}</p>
                <p>{address.neighborhood}, {address.city} - {address.stateCode}</p>
                <p>{address.postalCode}</p>
                {address.isDefault && (
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full mt-2 inline-block">
                        Padrão
                    </span>
                )}
            </div>
            <div>
                {/* TODO: Botão de Edição */}
                <button
                    onClick={() => onDelete(address.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                >
                    Excluir
                </button>
            </div>
        </div>
    </div>
);


export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            const data = await addressService.list();
            setAddresses(data);
        } catch (error) {
            toast.error('Não foi possível carregar seus endereços.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este endereço?')) {
            try {
                await addressService.remove(id);
                toast.success('Endereço excluído com sucesso!');
                // Atualiza a lista removendo o endereço excluído
                setAddresses(prev => prev.filter(addr => addr.id !== id));
            } catch (error) {
                toast.error('Falha ao excluir o endereço.');
            }
        }
    }


    if (isLoading) {
        return <p>Carregando endereços...</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Meus Endereços</h1>
                {/* TODO: Modal para adicionar novo endereço */}
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Adicionar Novo Endereço
                </button>
            </div>

            {addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <AddressCard key={address.id} address={address} onDelete={handleDelete} />
                    ))}
                </div>
            ) : (
                <p>Você ainda não cadastrou nenhum endereço.</p>
            )}
        </div>
    );
}