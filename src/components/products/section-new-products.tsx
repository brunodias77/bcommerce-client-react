import { productService } from "@/services/product-service";
import Section from "../ui/section";
import Title from "../ui/title";

export const SectionNewProducts = async () => {
    const pagedResult = await productService.listPublic({ pageSize: 8 });
    const products = pagedResult.items;
    if (!products || products.length === 0) {
        return (
            <div className="py-10 text-center">
                <p className="text-gray-500">Nenhum produto foi encontrado no momento.</p>
            </div>
        );
    }

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
            </div>
        </Section>
    );
}