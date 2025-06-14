import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    icon?: React.ReactNode;
    error?: string; // ✅ Novo: prop para a mensagem de erro
    className?: string; // ✅ Novo: prop para estilizar o container
}

const Input: React.FC<InputProps> = ({ id, label, icon, error, className, ...props }) => {
    // Define as classes de borda e foco com base na existência de erro
    const borderAndFocusClasses = error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return (
        <div className={className}> {/* ✅ className aplicado ao container */}
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    {...props}
                    className={`w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-white ${borderAndFocusClasses} ${icon ? 'pl-10' : ''}`}
                    aria-invalid={!!error} // ✅ Atributo de acessibilidade para erros
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            </div>

            {/* ✅ Exibe a mensagem de erro se ela existir */}
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;