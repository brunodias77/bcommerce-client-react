import InfoCompanyPolicies from "@/components/account/info-company-policies";
import { BannerHome } from "@/components/layout/banner";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <BannerHome />
      <InfoCompanyPolicies />
    </>
  );
}
