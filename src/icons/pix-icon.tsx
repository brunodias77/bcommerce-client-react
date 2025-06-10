import React from "react";

type PixIconProps = {
    width?: number;
    height?: number;
    color?: string;
    isActive?: boolean;
};

const PixIcon: React.FC<PixIconProps> = ({
    width = 21,
    height = 21,
    color = "#2d2926",
    isActive = true,
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={isActive ? color : "#9CA3AF"} viewBox="0 0 256 256"><path d="M235.34,116.72,139.28,20.66a16,16,0,0,0-22.56,0L20.66,116.72a16,16,0,0,0,0,22.56l96.06,96.06a16,16,0,0,0,22.56,0l96.06-96.06A16,16,0,0,0,235.34,116.72ZM128,32,184,88H160a8,8,0,0,0-5.66,2.34L128,116.68,101.66,90.34A8,8,0,0,0,96,88H72ZM56,104H92.68l24,24-24,24H56L32,128Zm72,120L72,168H96a8,8,0,0,0,5.66-2.34L128,139.31l26.34,26.35A8,8,0,0,0,160,168h24Zm72-72H163.32l-24-24,24-24H200l24,24Z"></path></svg>);
};

export default PixIcon;





