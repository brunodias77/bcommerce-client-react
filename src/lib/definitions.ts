/**
 * =================================================================
 * DEFINIÇÕES DE TIPOS GLOBAIS PARA O BCOMMERCE FRONTEND
 * =================================================================
 * Este arquivo contém as interfaces TypeScript que representam
 * os modelos de dados (DTOs) retornados pela API do backend.
 * Manter este arquivo sincronizado com os DTOs da camada de
 * Aplicação do backend é crucial para a consistência do projeto.
 * =================================================================
 */

// ================================================
// ENUMS E TIPOS LITERAIS
// ================================================

// Baseado em Bcommerce.Domain/Customers/Clients/Enums/AddressType.cs
export type AddressType = "Shipping" | "Billing";

// Baseado em Bcommerce.Domain/Customers/Clients/Enums/Role.cs
export type UserRole = "Customer" | "Admin";

// Baseado em Bcommerce.Domain/Sales/Orders/Enums/OrderStatus.cs
export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Canceled"
  | "Returned";

// ================================================
// AUTENTICAÇÃO E CLIENTES
// ================================================

// Corresponde ao LoginClientOutput.cs
export interface AuthResponse {
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
}

// Corresponde ao CreateClientOutput e GetMyProfileUseCase
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Corresponde ao AddressOutput.cs
export interface Address {
  id: string;
  clientId: string;
  type: AddressType;
  postalCode: string;
  street: string;
  streetNumber: string; // Alinhado com o DTO do backend
  complement?: string | null;
  neighborhood: string;
  city: string;
  stateCode: string;
  isDefault: boolean;
}

// ================================================
// CATÁLOGO: PRODUTOS, CATEGORIAS E MARCAS
// ================================================

// Corresponde ao CategoryOutput.cs
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parentCategoryId?: string | null;
  isActive: boolean;
  sortOrder: number;
}

// Corresponde à entidade Brand, que é simples e pode ser mapeada diretamente.
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logoUrl?: string | null;
  isActive: boolean;
}

// Corresponde ao ProductImageOutput.cs
export interface ProductImage {
  imageUrl: string;
  altText?: string | null;
  isCover: boolean;
  sortOrder: number;
}

// Corresponde ao ProductVariantOutput.cs
export interface ProductVariant {
  variantId: string;
  sku: string;
  colorId?: string | null;
  sizeId?: string | null;
  stockQuantity: number;
  additionalPrice: number;
  imageUrl?: string | null;
}

// Corresponde ao PublicProductOutput.cs (para a página de detalhes do produto)
export interface ProductDetails {
  id: string;
  baseSku: string;
  name: string;
  slug: string;
  description?: string | null;
  basePrice: number;
  salePrice?: number | null;
  categoryId: string;
  brandId?: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
}

// Corresponde ao PublicProductSummaryOutput.cs (para listagens e grids)
export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  salePrice?: number | null;
  coverImageUrl?: string | null;
}

// ================================================
// VENDAS: CARRINHO E PEDIDOS
// ================================================

// Corresponde ao CartItemOutput.cs
export interface CartItem {
  cartItemId: string;
  productVariantId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Corresponde ao CartOutput.cs
export interface Cart {
  cartId: string;
  clientId: string;
  totalCartPrice: number;
  items: CartItem[];
}

// Corresponde ao OrderOutput.cs
export interface Order {
  orderId: string;
  referenceCode: string;
  status: OrderStatus;
  totalAmount: number;
}

// ================================================
// UTILITÁRIOS E PAGINAÇÃO
// ================================================

// Corresponde ao PagedListOutput<T>
export interface PagedList<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
