// file: src/components/products/product-page-content.tsx
"use client";

import { ProductDetails } from "@/lib/definitions";
import Section from "../ui/section";
import ExpandableSection from "../ui/expandable-section";
import DocumentICon from "@/icons/document-icon";
import AlertIcon from "@/icons/alert-icon";
import { ProductGallery } from "./product-galery";
import { ProductActions } from "./product-actions";

interface ProductPageContentProps {
    product: ProductDetails;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
    return (
        <Section>
            <div className="container">
                {/* Seção Principal: Imagens e Ações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <ProductGallery images={product.images} />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-bold text-blue-primary">{product.name}</h1>
                        <div className="flex items-center gap-x-2">
                            {/* TODO: Usar dados reais do produto para avaliação */}
                            <span className="text-sm text-gray-500">4.5</span>
                            {/* <StarRating rating={4.5} /> */}
                            <span className="text-sm text-gray-500">(4 avaliações)</span>
                        </div>
                        <ProductActions product={product} />
                    </div>
                </div>

                {/* Seções de Detalhes */}
                <div className="flex flex-col gap-4">
                    <ExpandableSection title="Descrição do produto" icon={<DocumentICon color="#fec857" />}>
                        <p className="text-gray-600">{product.description ?? "Este produto não possui uma descrição detalhada."}</p>
                    </ExpandableSection>

                    <ExpandableSection title="Informações Técnicas" icon={<AlertIcon color="#fec857" />}>
                        {/* TODO: Mapear informações técnicas do produto aqui */}
                        <p className="text-gray-600">Em breve...</p>
                    </ExpandableSection>
                </div>
            </div>
        </Section>
    );
}