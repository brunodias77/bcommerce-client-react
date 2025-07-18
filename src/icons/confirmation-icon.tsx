import React from "react";

type ConfirmationIconProps = {
    width?: number;
    height?: number;
    color?: string;
    isActive?: boolean;
};

const ConfirmationIcon: React.FC<ConfirmationIconProps> = ({
    width = 21,
    height = 21,
    color = "#191C1F",
    isActive = true,
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2" d="M44 77C62.2254 77 77 62.2254 77 44C77 25.7746 62.2254 11 44 11C25.7746 11 11 25.7746 11 44C11 62.2254 25.7746 77 44 77Z" fill="#2DB324" />
            <path d="M59.125 35.75L38.9469 55L28.875 45.375" stroke="#2DB324" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M44 77C62.2254 77 77 62.2254 77 44C77 25.7746 62.2254 11 44 11C25.7746 11 11 25.7746 11 44C11 62.2254 25.7746 77 44 77Z" stroke="#2DB324" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ConfirmationIcon;


