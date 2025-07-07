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

export type AddressType = "Shipping" | "Billing";
export type UserRole = "Customer" | "Admin";
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

export interface AuthResponse {
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Address {
  id: string;
  clientId: string;
  type: AddressType;
  postalCode: string;
  street: string;
  streetNumber: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  stateCode: string;
  isDefault: boolean;
}

// ✅ CORREÇÃO: A interface que faltava foi adicionada.
export interface VerifyEmailResponse {
  message: string;
}

// ================================================
// CATÁLOGO: PRODUTOS, CATEGORIAS E MARCAS
// ================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parentCategoryId?: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logoUrl?: string | null;
  isActive: boolean;
}

export interface ProductImage {
  imageUrl: string;
  altText?: string | null;
  isCover: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  variantId: string;
  sku: string;
  colorId?: string | null;
  sizeId?: string | null;
  stockQuantity: number;
  additionalPrice: number;
  imageUrl?: string | null;
}

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

export interface CartItem {
  cartItemId: string;
  productVariantId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  cartId: string;
  clientId: string;
  totalCartPrice: number;
  items: CartItem[];
}

export interface Order {
  orderId: string;
  referenceCode: string;
  status: OrderStatus;
  totalAmount: number;
}

// ================================================
// UTILITÁRIOS E PAGINAÇÃO
// ================================================

export interface PagedList<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
} 
