// src/components/products/product-list.tsx
import { productService } from '@/services/product-service'; // Seu serviço
import { ProductCard } from './product-card';

/**
 * Este é um Componente de Servidor (Server Component).
 * Ele busca os dados diretamente no servidor usando uma função async.
 * A página só será renderizada no cliente após os dados serem carregados.
 */
export async function ProductList() {
    // 1. Chama o serviço para buscar os produtos.
    // Podemos passar parâmetros aqui se quisermos, ex: { pageSize: 8 }
    const pagedResult = await productService.listPublic({ pageSize: 8 });

    // 2. Extrai a lista de produtos do resultado paginado.
    const products = pagedResult.items;

    // 3. Verifica se algum produto foi encontrado.
    if (!products || products.length === 0) {
        return (
            <div className="py-10 text-center">
                <p className="text-gray-500">Nenhum produto foi encontrado no momento.</p>
            </div>
        );
    }

    // 4. Renderiza a lista de produtos.
    return (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}