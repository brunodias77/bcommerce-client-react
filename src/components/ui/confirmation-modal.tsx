// src/components/ui/confirmation-modal.tsx
"use client";

import React from 'react';
import Button from './button';
import AlertIcon from '@/icons/alert-icon';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, isLoading = false }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                        <AlertIcon color="#fec857" width={48} height={48} />
                    </div>
                    <h3 className="text-xl font-bold text-blue-primary mb-2">{title}</h3>
                    <p className="text-gray-600 mb-6">{message}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
                        Cancelar
                    </Button>
                    <Button type="button" onClick={onConfirm} isLoading={isLoading} disabled={isLoading}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;