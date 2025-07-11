import React from "react";

type DocumentIConProps = {
    width?: number;
    height?: number;
    color?: string;
};

const DocumentICon: React.FC<DocumentIConProps> = ({
    width = 21,
    height = 21,
    color = "#191C1F",
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.75 19H2.25C2.05109 19 1.86032 18.921 1.71967 18.7803C1.57902 18.6397 1.5 18.4489 1.5 18.25V1.75C1.5 1.55109 1.57902 1.36032 1.71967 1.21967C1.86032 1.07902 2.05109 1 2.25 1H11.25L16.5 6.25V18.25C16.5 18.4489 16.421 18.6397 16.2803 18.7803C16.1397 18.921 15.9489 19 15.75 19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.25 1V6.25H16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 10.75H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 13.75H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default DocumentICon;


