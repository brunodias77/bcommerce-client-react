/* eslint-disable @typescript-eslint/no-explicit-any */
// components/profile/modal-address.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';
import Input from '../ui/input';
import Button from '../ui/button';
import { addressService } from '@/services/address-service';
import { addressSchema } from '@/lib/schemas/address-schema';
import { cepService } from '@/services/cep-service';
import { Address } from '@/lib/definitions';

interface ModalAddressProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Para atualizar a lista de endereços no pai
    initialData?: Address | null; // ✅ 1. Prop para receber dados para edição

}

const ModalAddress: React.FC<ModalAddressProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const isEditMode = !!initialData; // Define se estamos em modo de edição


    // ✅ 2. Crie um estado para controlar todos os campos do formulário
    const [formData, setFormData] = useState({
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        stateCode: '',
        postalCode: '',
        type: 'Shipping', // Valor padrão
        isDefault: false,
    });


    // ✅  useEffect para preencher o formulário quando em modo de edição
    useEffect(() => {
        if (isEditMode) {
            setFormData({
                street: initialData.street,
                number: initialData.number,
                complement: initialData.complement || '',
                neighborhood: initialData.neighborhood,
                city: initialData.city,
                stateCode: initialData.stateCode,
                postalCode: initialData.postalCode,
                type: initialData.type,
                isDefault: initialData.isDefault,
            });
        }
    }, [initialData, isEditMode]);

    // ✅ 3. Lógica para buscar o endereço quando o CEP mudar
    useEffect(() => {
        // Remove qualquer formatação do CEP
        const cleanedCep = formData.postalCode.replace(/\D/g, '');

        if (cleanedCep.length === 8) {
            const fetchAddress = async () => {
                const addressData = await cepService.getAddressByCep(cleanedCep);
                if (addressData) {
                    // Preenche os campos do formulário com os dados da API
                    setFormData(prev => ({
                        ...prev,
                        street: addressData.logradouro,
                        neighborhood: addressData.bairro,
                        city: addressData.localidade,
                        stateCode: addressData.uf,
                    }));
                    setErrors({}); // Limpa erros antigos
                } else {
                    toast.error("CEP não encontrado.");
                }
            };
            fetchAddress();
        }
    }, [formData.postalCode]);

    if (!isOpen) {
        return null;
    }

    // ✅ 4. Handler para atualizar o estado do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';

        setFormData(prev => ({
            ...prev,
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const processedData = {
            ...formData,
            postalCode: formData.postalCode.replace(/\D/g, ''),
            type: formData.type === 'Shipping' ? 0 : 1,
        };

        const validationResult = addressSchema.safeParse(processedData);

        if (!validationResult.success) {
            // ... (lógica de erro de validação)
            setIsLoading(false);
            return;
        }

        try {
            // ✅ 3. Lógica condicional para chamar add ou update
            if (isEditMode) {
                await addressService.update(initialData.id, validationResult.data);
                toast.success("Endereço atualizado com sucesso!");
            } else {
                await addressService.add(validationResult.data);
                toast.success("Endereço cadastrado com sucesso!");
            }
            onSuccess(); // Chama a função de sucesso para atualizar a lista
            onClose(); // Fecha o modal
        } catch (error: any) {
            const defaultMessage = isEditMode ? 'Falha ao atualizar endereço.' : 'Falha ao cadastrar endereço.';
            const errorMessage = error.response?.data?.[0]?.message || defaultMessage;
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-blue-primary">
                        {isEditMode ? 'Editar Endereço' : 'Cadastrar Novo Endereço'}
                    </h3>
                    <button onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input id="postalCode" name="postalCode" label="CEP *" placeholder="Digite o CEP" maxLength={9} required
                        value={formData.postalCode} onChange={handleChange} error={errors.postalCode} />

                    <Input id="street" name="street" label="Rua *" placeholder="Será preenchido automaticamente" required
                        value={formData.street} onChange={handleChange} error={errors.street} />

                    <div className="grid grid-cols-2 gap-4">
                        <Input id="number" name="number" label="Número *" placeholder="Ex: 123" required
                            value={formData.number} onChange={handleChange} error={errors.number} />
                        <Input id="complement" name="complement" label="Complemento" placeholder="Apto, bloco, etc."
                            value={formData.complement} onChange={handleChange} error={errors.complement} />
                    </div>

                    <Input id="neighborhood" name="neighborhood" label="Bairro *" placeholder="Será preenchido automaticamente" required
                        value={formData.neighborhood} onChange={handleChange} error={errors.neighborhood} />

                    <div className="grid grid-cols-2 gap-4">
                        <Input id="city" name="city" label="Cidade *" placeholder="Será preenchida automaticamente" required
                            value={formData.city} onChange={handleChange} error={errors.city} />
                        <Input id="stateCode" name="stateCode" label="Estado (UF) *" placeholder="Ex: SP" maxLength={2} required
                            value={formData.stateCode} onChange={handleChange} error={errors.stateCode} />
                    </div>

                    {/* ... Select para 'type' e Checkbox para 'isDefault' usando `value` e `onChange` ... */}

                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" isLoading={isLoading} disabled={isLoading}>Salvar Endereço</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ModalAddress;

