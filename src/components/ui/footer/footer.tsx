import { Logo } from "../logo/logo"
import { FaInstagram } from "react-icons/fa"

export const Footer = () => {
    return (
        <footer className="bg-white min-w-full border-t border-zinc-300">
            <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 lg:py-16">
                <div className="md:flex md:justify-between md:items-start gap-10">
                    <div className="flex flex-col mb-8 md:mb-0">
                        <a href="#" className="flex items-center mb-4">
                            <Logo className="h-28" />
                        </a>
                        <span className="text-sm text-gray-500 sm:text-left">
                            © 2025 <a href="#" className="hover:underline">WBG Store</a>. All Rights Reserved.
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {/* Social */}
                        <div className="flex flex-col">
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Social</h2>
                            <ul className="flex space-x-4">
                                <li>
                                    <a
                                        href="https://www.instagram.com/webelieveinghosts/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-70 transition"
                                    >
                                        <FaInstagram className="w-6 h-6 text-black" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Newsletter</h2>
                            <p className="mb-4 text-gray-500 text-sm">Receba novidades e promoções direto no seu email.</p>
                            <form className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Seu email"
                                    className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none flex-1"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Inscrever
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
