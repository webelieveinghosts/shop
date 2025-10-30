import { Logo } from "../logo/logo"

export const Footer = () => {
    return (
        <footer className="bg-white min-w-full">
            <div className="w-full p-4 pb-6 lg:pb-8 pt-4 lg:pt-5">
                <div className="md:flex md:justify-between pt-4 lg:pt-5 border-t border-zinc-300">
                    <div className="flex flex-col mb-6 md:mb-0 justify-between">
                        <a href="#" className="flex items-center">
                            <Logo className="h-8" />
                        </a>

                        <span className="text-sm text-gray-500 sm:text-center">
                            © 2025 <a href="#" className="hover:underline">WBG Store</a>. All Rights Reserved.
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        {/*
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Company</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a href="https://flowbite.com/" className="hover:underline">About</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        */}
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Social</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a href="https://www.instagram.com/webelieveinghosts/" className="hover:underline">Instagram</a>
                                </li>
                            </ul>
                        </div>
                        {/**
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        </footer>
    )
}
