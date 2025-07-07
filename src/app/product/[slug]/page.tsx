// file: src/app/product/[slug]/page.tsx

import { ProductPageContent } from "@/components/products/product-page-content";
import { productService } from "@/services/product-service";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await productService.getBySlug(params.slug);

    // Se o produto não for encontrado, exibe a página 404
    if (!product) {
        notFound();
    }

    // ✅ CORREÇÃO: Passe o objeto 'product' completo como prop
    return <ProductPageContent product={product} />;
}