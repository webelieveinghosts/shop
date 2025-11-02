"use client"

import { Logo } from "@/components/ui/logo/logo"
import { usePathname } from "next/navigation"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { MenuIcon, XIcon, ShoppingCartIcon } from "lucide-react"
import { CartModal } from "../cart/cart-modal"

export const Navbar = () => {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    const links = [
        { name: "Início", href: "/" },
        { name: "Lookbook", href: "/lookbook" },
        { name: "Loja", href: "/loja" },
        { name: "Vídeos", href: "/videos" },
        { name: "Carrinho", href: "/carrinho" },
    ]

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 relative z-50">
            {/* Logo à esquerda */}
            <a href="/" className="flex items-center">
                <Logo className="w-36" />
            </a>

            {/* Links desktop */}
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

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
                    <MenuIcon className="w-6 h-6 text-black" />
                </button>
            </div>

            {/* Mobile menu */}
            <Transition show={mobileOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 md:hidden" onClose={setMobileOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-200 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="fixed inset-y-0 left-0 w-64 bg-white p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <Logo className="w-32" />
                                <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
                                    <XIcon className="w-6 h-6 text-black" />
                                </button>
                            </div>
                            <ul className="flex flex-col gap-4 uppercase text-black">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        {link.name === "Carrinho" ? (
                                            <CartModal /> // abre o modal no mobile
                                        ) : (
                                            <a
                                                href={link.href}
                                                className={`block transition-all duration-300 hover:text-gray-800 ${pathname === link.href ? "font-semibold underline" : ""
                                                    }`}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {link.name}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </nav>
    )
}
