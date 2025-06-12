import React from "react";

type HamburgerOpenIconProps = {
    width?: number;
    height?: number;
    color?: string;
    isActive?: boolean;
};

const HamburgerOpenIcon: React.FC<HamburgerOpenIconProps> = ({
    width = 21,
    height = 21,
    color = "#191C1F",
    isActive = true,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={width}   // Prop de largura aplicada
            height={height} // Prop de altura aplicada
        >
            <path
                fill={isActive ? color : "#00000"} // Cor condicional
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
            />
        </svg>
    );
};

export default HamburgerOpenIcon;