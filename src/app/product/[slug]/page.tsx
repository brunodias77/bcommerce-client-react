import { ProductPageContent } from "@/components/products/product-page-content";

interface ProductPageProps {
    params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
    return (
        <ProductPageContent slug={params.slug} />
    );
}
