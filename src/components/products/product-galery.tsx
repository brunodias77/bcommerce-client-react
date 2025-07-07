// file: src/components/products/product-details/product-gallery.tsx
"use client";

import { useState } from "react";
import { ProductImage } from "@/lib/definitions";

interface ProductGalleryProps {
    images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    // Define a imagem de capa ou a primeira imagem como inicial
    const coverImage = images.find(img => img.isCover) || images[0];
    const [selectedImage, setSelectedImage] = useState<ProductImage>(coverImage);

    if (!images || images.length === 0) {
        return <div className="flex-[4] bg-gray-200 rounded-xl animate-pulse" />;
    }

    return (
        <div className="flex flex-1 gap-x-2 max-w-[600px]">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
                {images.map((image) => (
                    <div
                        key={image.imageUrl}
                        className={`w-16 h-16 rounded-lg cursor-pointer overflow-hidden border-2 ${selectedImage.imageUrl === image.imageUrl ? 'border-yellow-primary' : 'border-transparent'}`}
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={image.imageUrl}
                            alt={image.altText ?? 'Imagem do Produto'}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>

            {/* Imagem Principal */}
            <div className="flex-[4] flex">
                <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.altText ?? 'Imagem Principal do Produto'}
                    className="object-contain w-full h-full rounded-xl"
                />
            </div>
        </div>
    );
}