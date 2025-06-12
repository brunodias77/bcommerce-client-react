import React from "react";

type HamburgerCloseIconProps = {
    width?: number;
    height?: number;
    color?: string;
    isActive?: boolean;
};

const HamburgerCloseIcon: React.FC<HamburgerCloseIconProps> = ({
    width = 21,
    height = 21,
    color = "#191C1F",
    isActive = true,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width={width}   // Aplica a largura
            height={height} // Aplica a altura
        >
            <path
                fill={isActive ? color : "#000"} // Cor dinâmica
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
            />
        </svg>
    );
};

export default HamburgerCloseIcon;