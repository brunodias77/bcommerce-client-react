"use client";

type ProductPageContentProps = {
    slug: string;
};

export const ProductPageContent = ({ slug }: ProductPageContentProps) => {
    return (
        <div>
            Página de produto: {slug}
        </div>
    );
};
