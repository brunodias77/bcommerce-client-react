// src/components/products/product-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ProductSummary } from '@/lib/definitions';
import Button from '@/components/ui/button';
import CartIcon from '@/icons/cart-icon';

interface ProductCardProps {
    product: ProductSummary;
}

// Função para formatar o preço
const formatPrice = (price: { amount: number; currency: string }) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: price.currency,
    }).format(price.amount);
};

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.slug}`} className="cursor-pointer" >
            <div className="relative max-w-[300px]  flex flex-col items-center group w-full  h-full border border-gray-200 hover:border-yellow-primary rounded-lg shadow-sm overflow-hidden cursor-pointer">
                {product.salePrice && <div className="absolute top-2 left-2 z-30 text-xs text-white font-bold bg-yellow-primary rounded-lg p-[4px]">OFERTA</div>}
                <div className="relative w-full h-[220px] overflow-hidden rounded-md">
                    <Image
                        src={product.coverImageUrl ?? "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-115"
                    />
                </div>

                <div className="p-4 w-full flex flex-col">
                    <h4 className="text-[12px] md:text-[13px] mb-1 text-gray-tertiary">{"categoria"}</h4>
                    <h2 className="text-[16px] font-bold text-blue-primary line-clamp-1 ">{product.name}</h2>
                    <div className="flex items-center space-x-1">
                        {/* <StarRating size="text-[10px] md:text-[15px]" /> */}
                        <span className="text-[8px] md:text-[11px] text-gray-500 text-center">4.5</span>
                        <span className="text-[8px] md:text-[11px] text-gray-500 text-center">(4)</span>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 mt-2">
                        <div className="flex items-center justify-center gap-x-2">
                            <h5 className="text-[14px] md:text-[16px] font-bold text-blue-primary">  {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(product.basePrice)}</h5>
                            {product.salePrice && (
                                <>
                                    <span className="text-xs  text-gray-400 line-through"> {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(product.salePrice)}</span>
                                    <span className="text-sm text-yellow-primary font-bold">30% OFF</span>
                                </>
                            )}
                        </div>
                        <button
                            className="bg-yellow-primary hover:bg-yellow-secondary rounded p-2 cursor-pointer  transition transform active:scale-95 text-xs flex items-center justify-center " >
                            <CartIcon color="#2d2926" height={20} width={20} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
        // <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        //     <Link href={`/product/${product.slug}`} className="cursor-pointer">
        //         <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-60">
        //             <Image
        //                 src={product.coverImageUrl ?? "/placeholder.png"}
        //                 alt={product.name}
        //                 width={300}
        //                 height={400}
        //                 className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 sm:h-full sm:w-full"
        //             />
        //         </div>
        //     </Link>
        //     <div className="flex flex-1 flex-col space-y-2 p-4">
        //         <h3 className="text-sm font-medium text-gray-900">
        //             <Link href={`/product/${product.slug}`}>
        //                 {product.name}
        //             </Link>
        //         </h3>
        //         <div className="flex flex-1 flex-col justify-end">
        //             <p className="text-base font-semibold text-gray-900">
        //                 {formatPrice({ amount: product.basePrice, currency: "BRL" })}
        //             </p>
        //         </div>
        //     </div>
        //     <div className="p-4 pt-0">
        //         <Button className="w-full">
        //             <CartIcon /> Adicionar ao Carrinho
        //         </Button>
        //     </div>
        // </div>
    );
}