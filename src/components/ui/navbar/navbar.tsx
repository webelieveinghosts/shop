"use client"

import { Logo } from "@/components/ui/logo/logo"
import { usePathname } from "next/navigation"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "lucide-react"
import { CartModal } from "../cart/cart-modal"

export const Navbar = () => {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    const links = [
        { name: "Início", href: "/home" },
        { name: "Lookbook", href: "/lookbook" },
        { name: "Loja", href: "/shop" },
        { name: "Vídeos", href: "/videos" },
    ]

    const closeMobileMenu = () => setMobileOpen(false)

    const handleCartClick = () => {
        closeMobileMenu()
        setCartOpen(true)
    }

    return (
        <nav className="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200 relative z-50">
            {/* Logo */}
            <a href="/" className="flex items-center">
                <Logo className="w-32" />
            </a>

            {/* Links desktop */}
            <ul className="hidden md:flex gap-6 uppercase text-sm">
                {links.map((link) => (
                    <li key={link.name}>
                        <a
                            href={link.href}
                            className={`text-black/70 transition-all duration-300 hover:text-black hover:underline ${pathname === link.href ? "underline text-black" : ""
                                }`}
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
                {/* Carrinho como link textual */}
                <li>
                    <CartModal isOpen={cartOpen} onOpenChange={setCartOpen}>
                        <span className="text-black/70 transition-all duration-300 hover:text-black hover:underline cursor-pointer">
                            Carrinho
                        </span>
                    </CartModal>
                </li>
            </ul>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMobileOpen(true)}
                    aria-label="Abrir menu"
                    className="p-1"
                >
                    <MenuIcon className="w-5 h-5 text-black" />
                </button>
            </div>

            {/* Mobile menu */}
            <Transition show={mobileOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileOpen}>
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

                    <div className="fixed inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-200 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="fixed inset-y-0 left-0 w-64 bg-white p-4 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <Logo className="w-28" />
                                    <button
                                        onClick={closeMobileMenu}
                                        aria-label="Fechar menu"
                                        className="p-1"
                                    >
                                        <XIcon className="w-5 h-5 text-black" />
                                    </button>
                                </div>
                                <ul className="flex flex-col gap-3 uppercase text-sm text-black">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className={`block transition-all duration-300 hover:text-gray-800 ${pathname === link.href ? "font-semibold underline" : ""
                                                    }`}
                                                onClick={closeMobileMenu}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <div
                                            className="block transition-all duration-300 hover:text-gray-800 cursor-pointer"
                                            onClick={handleCartClick}
                                        >
                                            Carrinho
                                        </div>
                                    </li>
                                </ul>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </nav>
    )
}