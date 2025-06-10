"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UserIcon from "@/icons/user-icon";
import HeartIcon from "@/icons/heart-icon";
import CartIcon from "@/icons/cart-icon";
import logo from "../../../../public/assets/logo/logo-bcommerce.png";


const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);
    const getCartCount = 1;

    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpened((prev) => !prev);
    return (
        <header
            className={`w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md transition-shadow duration-300 ${hasShadow ? "shadow-md" : ""
                }`}
        >
            <div className="mx-auto max-w-[1440px] px-6 py-1 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-1">
                    <Image
                        src={logo}
                        alt="logo da empresa"
                        width={60}
                        height={60}
                        priority
                    />
                </Link>

                {/* Menu */}
                <div className="flex-1">
                    <nav>
                        home
                    </nav>
                </div>

                {/* Ícones */}
                <div className="flex-1 flex items-center justify-end gap-x-4 xs:gap-x-16">
                    {menuOpened ? (
                        <span>Menu Aberto</span>

                    ) : (
                        <span>Menu Fechado</span>
                    )}

                    {/* PROFILE */}
                    <button
                        className="group relative cursor-pointer flex"
                    >
                        <UserIcon color="#2d2926" />
                    </button>

                    {/* FAVORITOS */}
                    <Link href="/favoritos" className="group relative cursor-pointer flex">
                        <HeartIcon color="#2d2926" />
                    </Link>

                    {/* CARRINHO */}
                    <Link href="/carrinho" className="flex relative">
                        <CartIcon color="#2d2926" />
                        <span className="bg-yellow-primary text-black-primary text-[12px] font-semibold absolute -top-3.5 -right-2 flex items-center justify-center w-4 h-4 rounded-full shadow-md">
                            {getCartCount}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
export default Header;

