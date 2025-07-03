import { api } from "@/lib/api";
import { PagedList, ProductDetails, ProductSummary } from "@/lib/definitions";

/**
 * =================================================================
 * DTO (Data Transfer Object) para Parâmetros de Listagem
 * =================================================================
 * Interface que representa os parâmetros de consulta para a listagem
 * de produtos, espelhando o `ListPublicProductsInput.cs` do backend.
 */
interface ListProductsParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  categorySlug?: string;
  brandSlug?: string;
  sortBy?: "name" | "price";
  sortDirection?: "asc" | "desc";
}

/**
 * =================================================================
 * SERVIÇO DE PRODUTOS (ProductService)
 * =================================================================
 * Encapsula as chamadas de API para o catálogo público de produtos.
 */
class ProductService {
  /**
   * Busca uma lista paginada de produtos públicos.
   * Permite filtros por termo de busca, categoria e marca.
   * Mapeia para: GET /api/products
   * @param params - Os parâmetros de consulta para a listagem.
   */
  async listPublic(
    params: ListProductsParams = {}
  ): Promise<PagedList<ProductSummary>> {
    // Constrói os parâmetros da URL a partir do objeto de entrada
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.pageSize)
      queryParams.append("pageSize", params.pageSize.toString());
    if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
    if (params.categorySlug)
      queryParams.append("categorySlug", params.categorySlug);
    if (params.brandSlug) queryParams.append("brandSlug", params.brandSlug);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortDirection)
      queryParams.append("sortDirection", params.sortDirection);

    const { data } = await api.get<PagedList<ProductSummary>>(
      `/products?${queryParams.toString()}`
    );
    return data;
  }

  /**
   * Busca os detalhes completos de um produto pelo seu slug.
   * Mapeia para: GET /api/products/{slug}
   * @param slug - O slug do produto a ser buscado.
   */
  async getBySlug(slug: string): Promise<ProductDetails> {
    const { data } = await api.get<ProductDetails>(`/products/${slug}`);
    return data;
  }
}

export const productService = new ProductService();
