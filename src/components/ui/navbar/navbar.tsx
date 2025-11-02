"use client"

import { Logo } from "@/components/ui/logo/logo"
import { CartModal } from "../cart/cart-modal"
import { usePathname } from "next/navigation"

export const Navbar = () => {
    const pathname = usePathname()

    const links = [
        { name: "Início", href: "/" },
        { name: "Lookbook", href: "/lookbook" },
        { name: "Loja", href: "/loja" },
        { name: "Vídeos", href: "/videos" },
    ]

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
            {/* Logo à esquerda */}
            <a href="/" className="flex items-center">
                <Logo className="w-36" />
            </a>

            {/* Links centralizados */}
            <ul className="hidden md:flex gap-8 uppercase text-sm">
                {links.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className={`text-black/70 transition-all duration-300 hover:text-black hover:underline ${pathname === link.href ? "underline text-black" : ""
                                }`}
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Cart e links mobile */}
            <div className="flex items-center gap-4">
                <div className="flex md:hidden gap-4 uppercase text-sm">
                    {links
                        .filter((link) => link.href !== pathname)
                        .map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-black/70 transition-all duration-300 hover:text-black hover:underline"
                            >
                                {link.name}
                            </a>
                        ))}
                </div>

                <CartModal />
            </div>
        </nav>
    )
}
