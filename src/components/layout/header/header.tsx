"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UserIcon from "@/icons/user-icon";
import HeartIcon from "@/icons/heart-icon";
import CartIcon from "@/icons/cart-icon";
import logo from "../../../../public/assets/logo/logo-bcommerce.png";
import HamburgerOpenIcon from "@/icons/hamburger-open-icon";
import HamburgerCloseIcon from "@/icons/hamburger-close-icon";
import Navbar from "./navbar";
import { useAuthStore } from "@/store/auth-store";
import router from "next/router";


const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);
    const getCartCount = 1;
    const { token, user } = useAuthStore();


    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleProfileClick = () => {
        // Verifica se o usuário está autenticado
        if (token && user) {
            router.push("/account");
        } else {
            router.push("/auth/login");
        }
    };

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


                <div className="flex-1">
                    <Navbar
                        containerStyles={`${menuOpened
                            ? "xl:hidden flex items-start flex-col gap-x-8 fixed top-16 right-6 py-5 px-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50"
                            : "hidden xl:flex items-center justify-around gap-x-5 xl:gap-x-7 text-[15px] font-[500] bg-primary ring-1 ring-slate-900/5 rounded-full p-1"
                            }`}
                        onClick={() => setMenuOpened(false)}
                    />
                </div>

                {/* Ícones */}
                <div className="flex-1 flex items-center justify-end gap-x-4 xs:gap-x-16">


                    {/* PROFILE */}
                    <button
                        className="group relative cursor-pointer flex"
                        onClick={handleProfileClick}
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

                    {menuOpened ? (
                        <button onClick={toggleMenu} className="xl:hidden cursor-pointer text-xl">
                            <HamburgerOpenIcon />
                        </button>

                    ) : (
                        <button onClick={toggleMenu} className="xl:hidden cursor-pointer text-xl">
                            <HamburgerCloseIcon />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
export default Header;

