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
        <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-white shadow-sm">
            <div className="flex w-full items-center">
                <div className="hidden md:flex w-1/3">
                    <ul className="flex gap-6 text-sm uppercase">
                        {links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className={`text-black/70 underline-offset-4 transition-all duration-300 hover:text-black hover:underline ${pathname === link.href ? "underline text-black" : ""
                                        }`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex w-full md:justify-center md:w-1/3">
                    <a href="/" className="flex items-center justify-center w-full md:w-auto">
                        <Logo className="w-48" />
                    </a>
                </div>

                <div className="flex justify-end md:w-1/3 items-center gap-4">
                    <div className="flex md:hidden gap-4 text-sm uppercase">
                        {links
                            .filter((link) => link.href !== pathname)
                            .map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-black/70 underline-offset-4 hover:text-black hover:underline transition-all duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                    </div>

                    <CartModal />
                </div>
            </div>
        </nav>
    )
}
