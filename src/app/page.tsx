import InfoCompanyPolicies from "@/components/account/info-company-policies";
import { BannerHome } from "@/components/layout/banner";
import Image from "next/image";
import { ProductList } from '@/components/products/product-list';


export default function Home() {
  return (
    <>
      <BannerHome />
      <InfoCompanyPolicies />
      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="sr-only">
          Produtos
        </h2>

        {/* O componente ProductList buscará e renderizará os produtos no servidor.
          A página só será exibida no navegador com tudo já carregado.
        */}
        <ProductList />
      </section>
    </>
  );
}
