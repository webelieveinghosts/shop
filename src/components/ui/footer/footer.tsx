import { Logo } from "../logo/logo"
import { FaInstagram } from "react-icons/fa"

export const Footer = () => {
    return (
        <footer className="bg-black text-white min-w-full border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
                <div className="md:flex md:justify-between md:items-start gap-8">
                    <div className="flex flex-col mb-6 md:mb-0">
                        <a href="#" className="flex items-center mb-3">
                            <Logo className="h-20" />
                        </a>
                        <span className="text-xs text-gray-400 sm:text-left">
                            © 2025 <a href="#" className="hover:underline">WBG Store</a>. Todos os direitos reservados.
                        </span>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col mb-6 md:mb-0">
                        <h2 className="mb-3 text-sm font-semibold uppercase">Social</h2>
                        <ul className="flex space-x-4">
                            <li>
                                <a
                                    href="https://www.instagram.com/webelieveinghosts/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-70 transition"
                                >
                                    <FaInstagram className="w-5 h-5 text-white" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="mb-3 text-sm font-semibold uppercase">Newsletter</h2>
                        <p className="mb-3 text-gray-400 text-sm">Receba novidades e promoções direto no seu email.</p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Seu email"
                                className="p-2 rounded-md border border-gray-700 bg-black text-white focus:ring-2 focus:ring-white focus:outline-none flex-1"
                            />
                            <button
                                type="submit"
                                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition"
                            >
                                Assinar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}
