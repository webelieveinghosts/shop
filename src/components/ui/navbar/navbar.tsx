import { Logo } from "@/components/ui/logo/logo"
import { CartModal } from "../cart/cart-modal"

export const Navbar = () => {
    return (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
            <div className="flex w-full items-center">
                <div className="hidden md:flex w-1/3">
                    <ul className="gap-6 text-xs md:flex md:items-center uppercase">
                        <li>
                            <a className="text-black/60 underline-offset-4 hover:text-black hover:underline transition-all duration-300" href="/">Início</a>
                        </li>
                        <li>
                            <a className="text-black/60 underline-offset-4 hover:text-black hover:underline transition-all duration-300" href="/lookbook">Lookbook</a>
                        </li>
                    </ul>
                </div>

                <div className="flex w-full md:justify-center md:w-1/3">
                    <a className="mr-2 flex w-full items-center md:justify-center md:w-auto lg:mr-6" href="/">
                        <Logo className="w-14" />
                    </a>
                </div>

                <div className="flex justify-end md:w-1/3">
                    <CartModal />
                </div>
            </div>
        </nav>
    )
}