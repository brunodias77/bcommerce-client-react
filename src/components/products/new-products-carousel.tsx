// file: components/sections/new-products-carousel.tsx

"use client";

import { useRef, useEffect } from "react";
// ✅ CORREÇÃO: Importando a tipagem correta que existe no arquivo.
import { ProductSummary } from "@/lib/definitions";
import { ProductCard } from "@/components/products/product-card";

interface NewProductsCarouselProps {
    // ✅ CORREÇÃO: Usando a tipagem correta para a prop.
    products: ProductSummary[];
}

/**
 * @description Componente de Cliente para renderizar o carrossel de produtos.
 */
export const NewProductsCarousel = ({ products }: NewProductsCarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!carouselRef.current) return;

            const container = carouselRef.current;
            const firstChild = container.firstChild;

            if (!(firstChild instanceof HTMLElement)) return;

            const slideWidth = firstChild.offsetWidth + 16;
            const nextScroll = container.scrollLeft + slideWidth;

            if (nextScroll >= container.scrollWidth - container.clientWidth) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollTo({ left: nextScroll, behavior: 'smooth' });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory space-x-4 scroll-smooth hide-horizontal-scrollbar"
        >
            {products.map((product) => (
                <div
                    key={product.id}
                    className="snap-start shrink-0 w-[200px] md:w-[250px] xl:w-[280px]"
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};