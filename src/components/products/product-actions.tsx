// file: src/components/products/product-details/product-actions.tsx
"use client";

import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { ProductDetails, ProductVariant } from "@/lib/definitions";
import Button from "@/components/ui/button";
import CartIcon from "@/icons/cart-icon";
import FavoriteIcon from "@/icons/favorite-icon";
import TruckIcon from "@/icons/truck-icon";
import ShippingForm from "../shipping/shipping-form";
import AlertIcon from "@/icons/alert-icon";
import { useCart } from "@/hooks/use-cart";

interface ProductActionsProps {
    product: ProductDetails;
}

// Função utilitária para formatar moeda
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function ProductActions({ product }: ProductActionsProps) {
    // Inicialização segura: funciona tanto para produtos com variantes quanto sem.
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        product.variants?.[0]
    );

    const [isFavorite, setIsFavorite] = useState(false);
    const { addItem, isLoading } = useCart();

    // O preço é recalculado de forma otimizada apenas quando a variante selecionada muda.
    const currentPrice = useMemo(() => {
        // Se não houver variante, usa o preço base do produto.
        if (!selectedVariant) return product.basePrice;
        // Soma o preço base (ou preço de venda) com o preço adicional da variante.
        return (product.salePrice ?? product.basePrice) + selectedVariant.additionalPrice;
    }, [selectedVariant, product.basePrice, product.salePrice]);

    const priceWithDiscount = currentPrice * 0.9;
    const installmentValue = currentPrice / 10;

    // Condição de disponibilidade: só é 'true' se houver uma variante E ela tiver estoque.
    const isAvailableForPurchase = selectedVariant && selectedVariant.stockQuantity > 0;

    const handleAddToCart = async () => {
        // Verificação de segurança antes de adicionar ao carrinho.
        if (!isAvailableForPurchase) {
            toast.error("Este produto não está disponível para compra.");
            return;
        }
        await addItem(selectedVariant.variantId, 1);
    };

    return (
        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-gray-50">
            {/* Informações de Entrega */}
            <span className="text-gray-600 text-sm">
                Vendido e entregue por: <span className="text-blue-primary font-bold">Bcommerce</span>
            </span>
            <div className="flex items-center gap-x-2">
                <TruckIcon width={20} height={20} color="#fec857" />
                <span className="text-xs text-gray-600"><span className="font-bold text-yellow-primary">FRETE GRÁTIS*</span> - consulte disponibilidade</span>
            </div>

            {/* Seção de Seleção de Variantes */}
            {product.variants && product.variants.length > 1 && (
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-gray-700">Selecione uma opção:</span>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                            <button
                                key={variant.variantId}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-3 py-1 border-2 rounded-md text-sm transition-colors ${selectedVariant?.variantId === variant.variantId
                                    ? 'border-blue-primary text-blue-primary font-bold bg-blue-50'
                                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                                    }`}
                                // Desabilita a opção se não tiver estoque
                                disabled={variant.stockQuantity === 0}
                            >
                                {/* TODO: Mapear 'colorId' e 'sizeId' para nomes de Cor/Tamanho */}
                                Opção {variant.sku.slice(-4)}
                                {variant.stockQuantity === 0 && ' (Esgotado)'}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Seção de Preços */}
            {product.salePrice && (
                <span className="text-gray-500 line-through">{formatCurrency(product.basePrice + (selectedVariant?.additionalPrice ?? 0))}</span>
            )}
            <div className="flex items-center gap-x-4">
                <span className="text-yellow-primary font-bold text-4xl">{formatCurrency(priceWithDiscount)}</span>
                <span className="text-sm text-gray-600">À vista no PIX</span>
            </div>

            {/* Seção de Ações (Botões) */}
            <div className="flex items-center gap-x-4 my-2">
                <Button
                    variant="secondary"
                    onClick={handleAddToCart}
                    isLoading={isLoading}
                    disabled={!isAvailableForPurchase || isLoading}
                    className="flex-grow"
                >
                    {!isLoading && <CartIcon color="#FFF" height={20} width={20} />}
                    <span className="text-lg font-bold text-white">
                        {isLoading
                            ? "Adicionando..."
                            : isAvailableForPurchase
                                ? "Adicionar ao carrinho"
                                : "Produto indisponível"}
                    </span>
                </Button>
                <button onClick={() => setIsFavorite(!isFavorite)} disabled={isLoading}>
                    <FavoriteIcon width={30} height={30} isFavorite={isFavorite} />
                </button>
            </div>

            {/* Informações de Parcelamento */}
            <div className="text-gray-600 text-sm flex flex-col">
                <span className="text-lg text-blue-primary font-bold">{formatCurrency(currentPrice)}</span>
                <span>ou até 10x de <span className="text-blue-primary font-bold">{formatCurrency(installmentValue)}</span> sem juros</span>
            </div>

            {/* Formulário de Frete */}
            <div className="flex flex-col gap-1 mt-4">
                <span className="text-sm text-blue-primary font-bold">Consultar frete e prazo</span>
                <ShippingForm />
                <div className="flex items-center gap-2 mt-2">
                    <AlertIcon color="#fec857" height={12} width={12} />
                    <span className="text-xs text-gray-500">O prazo de entrega é calculado após a confirmação do pagamento.</span>
                </div>
            </div>
        </div>
    );
}