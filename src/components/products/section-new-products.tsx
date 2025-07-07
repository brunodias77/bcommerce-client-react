// file: src/components/products/section-new-products.tsx

import { productService } from "@/services/product-service";
import Section from "../ui/section";
import Title from "../ui/title";
import { NewProductsCarousel } from "./new-products-carousel";
import { ProductSummary } from "@/lib/definitions";

/**
 * @description Componente de Servidor (RSC) para buscar e exibir a seção de novos produtos.
 */
export const SectionNewProducts = async () => {
    // 1. Busca os dados da API
    const pagedResult = await productService.listPublic({ pageSize: 12 });

    if (!pagedResult || pagedResult.items.length === 0) {
        return (
            <Section>
                <div className="container text-center">
                    <p className="text-gray-500">Nenhum produto novo foi encontrado no momento.</p>
                </div>
            </Section>
        );
    }

    // 2. ✅ CORREÇÃO: Filtra os produtos para garantir que cada 'id' seja único.
    // Esta linha é a solução para o erro de chaves duplicadas.
    const uniqueProducts = Array.from(
        new Map(pagedResult.items.map(product => [product.id, product])).values()
    );

    // 3. Pega os primeiros 8 produtos da lista já sem duplicatas
    const newProducts: ProductSummary[] = uniqueProducts.slice(0, 8);

    // 4. Renderiza o carrossel com a lista limpa
    return (
        <Section>
            <div className="container">
                <Title
                    title="Novos"
                    subtitle=" Produtos"
                    content="Explore os lançamentos mais recentes, selecionados para transformar sua rotina com inovação e estilo."
                    titleStyles="pb-1"
                    contentStyles="block"
                    styles="block pb-10"
                />

                <NewProductsCarousel products={newProducts} />
            </div>
        </Section>
    );
};