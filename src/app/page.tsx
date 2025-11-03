import { Logo } from "../components/ui/logo/logo"


export default async function Main() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white px-6">
            {/* Container centralizado com logo e botões juntos */}
            <div className="flex flex-col items-center justify-center space-y-10">
                {/* Logo com efeito sutil */}
                <div className="flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                    <Logo className="h-48 md:h-64 lg:h-80 w-auto drop-shadow-lg" />
                </div>

                {/* Navegação - Grid consistente */}
                <section className="w-full max-w-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { href: "/home", label: "HOME" },
                            { href: "/shop", label: "SHOP" },
                            { href: "/lookbook", label: "LOOKBOOK" },
                            { href: "/videos", label: "VIDEOS" }
                        ].map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="group relative bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-gray-300 text-center font-medium text-sm uppercase tracking-wider min-w-[120px]"
                            >
                                <span className="relative z-10">{item.label}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            {/* Efeito de partículas sutil no fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-300 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gray-400 rounded-full opacity-30 animate-pulse delay-300"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-25 animate-pulse delay-700"></div>
            </div>
        </main>
    )
}