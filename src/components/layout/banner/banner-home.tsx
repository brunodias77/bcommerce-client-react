// banner/banner-home.tsx
import React from 'react';

const BannerHome: React.FC = () => {
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[url('/assets/banners/banner-1.png')] bg-no-repeat bg-top bg-contain md:bg-cover md:bg-center h-[300px] sm:h-[400px] md:h-[633px] transition-all duration-300 ease-in-out">
                {/* Conteúdo opcional aqui */}
            </div>
        </section>
    );
};

export default BannerHome;