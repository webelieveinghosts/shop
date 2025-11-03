"use client"

import { Logo } from "../logo/logo"

export default function Main() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 relative overflow-hidden">
            {/* Efeitos de fundo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200/20 via-transparent to-transparent"></div>

            {/* Container centralizado */}
            <div className="flex flex-col items-center justify-center space-y-12 relative z-10">
                {/* Logo com destaque */}
                <div className="flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
                    <Logo className="h-48 md:h-64 lg:h-80 w-auto filter drop-shadow-2xl" />
                </div>

                {/* Navegação - Design retangular premium */}
                <section className="w-full max-w-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {[
                            { href: "/home", label: "HOME" },
                            { href: "/shop", label: "SHOP" },
                            { href: "/lookbook", label: "LOOKBOOK" },
                            { href: "/videos", label: "VIDEOS" }
                        ].map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="group relative bg-gradient-to-br from-black to-gray-900 text-white px-6 py-4 transition-all duration-500 ease-out transform hover:scale-105 hover:translate-y-[-2px] shadow-2xl hover:shadow-3xl border border-gray-800 text-center font-semibold text-sm uppercase tracking-widest min-w-[120px] overflow-hidden"
                            >
                                {/* Efeito de brilho */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                {/* Texto com efeito */}
                                <span className="relative z-10 text-white group-hover:text-gray-100 transition-colors duration-300">
                                    {item.label}
                                </span>

                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-1 h-1 bg-gray-400 rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-gray-500 rounded-full opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-20 w-1 h-1 bg-gray-400 rounded-full opacity-50 animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-32 w-0.5 h-0.5 bg-gray-600 rounded-full opacity-60 animate-pulse delay-1500"></div>
            </div>
        </main>
    )
}