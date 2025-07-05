import InfoCompanyPolicies from "@/components/account/info-company-policies";
import { BannerHome } from "@/components/layout/banner";
import Image from "next/image";
import { ProductList } from '@/components/products/product-list';
import Section from "@/components/ui/section";
import Title from "@/components/ui/title";
import { SectionNewProducts } from "@/components/products/section-new-products";


export default function Home() {
  return (
    <>
      <BannerHome />
      <InfoCompanyPolicies />
      <SectionNewProducts />
    </>
  );
}
