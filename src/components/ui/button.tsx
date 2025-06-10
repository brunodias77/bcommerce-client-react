import React from "react";

// As props permanecem as mesmas para manter a API do componente.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    iconLeft?: React.ReactNode;
    isLoading?: boolean;
}

const Button = ({
    children,
    variant = "primary",
    size = "medium",
    fullWidth = false,
    className = "",
    disabled = false,
    iconLeft,
    isLoading = false,
    ...props
}: ButtonProps) => {

    // Objeto de estilos centralizado para simplificar a lógica.
    const styles = {
        base: "rounded focus:outline-none transition transform active:scale-95 flex items-center justify-center cursor-pointer",
        variants: {
            primary: "bg-[#2d2926] text-white hover:brightness-50",
            secondary: "bg-[#fec857] text-white hover:brightness-90",
        },
        sizes: {
            small: "py-1 px-2 text-sm gap-1",
            medium: "py-2 px-4 text-base gap-2",
            large: "py-4 px-8 text-lg gap-3",
        },
        state: {
            disabled: "opacity-50 cursor-not-allowed",
        },
    };

    // Concatenação de classes mais limpa com template literals.
    const combinedClass = `
        ${styles.base}
        ${styles.variants[variant]}
        ${styles.sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || isLoading ? styles.state.disabled : ""}
        ${className}
    `.trim().replace(/\s+/g, " "); // Limpa espaços extras.

    return (
        <button
            className={combinedClass}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                // Spinner de carregamento
                <div className="animate-spin w-4 h-4 border-2 border-t-transparent border-white rounded-full" />
            ) : (
                // Conteúdo do botão
                <>
                    {iconLeft}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;