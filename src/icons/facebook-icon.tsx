import React from "react";

type FacebookIconProps = {
    width?: number;
    height?: number;
    color?: string;
    isActive?: boolean;
};

const FacebookIcon: React.FC<FacebookIconProps> = ({
    width = 21,
    height = 21,
    color = "#191C1F",
    isActive = true,
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.5 10.0558C0.5 15.0275 4.11083 19.1617 8.83333 20V12.7775H6.33333V10H8.83333V7.7775C8.83333 5.2775 10.4442 3.88917 12.7225 3.88917C13.4442 3.88917 14.2225 4 14.9442 4.11083V6.66667H13.6667C12.4442 6.66667 12.1667 7.2775 12.1667 8.05583V10H14.8333L14.3892 12.7775H12.1667V20C16.8892 19.1617 20.5 15.0283 20.5 10.0558C20.5 4.525 16 0 10.5 0C5 0 0.5 4.525 0.5 10.0558Z" fill="#1A78F1" />
        </svg>
    );
};

export default FacebookIcon;


