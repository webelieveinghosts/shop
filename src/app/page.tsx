import { Logo } from "../components/ui/logo/logo"

export default async function Main() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-6">
            {/* Logo Grande */}
            <div className="flex-1 flex items-center justify-center mb-8">
                <div className="flex items-center justify-center">
                    <Logo className="h-48 md:h-64 lg:h-80 w-auto" />
                </div>
            </div>

            {/* Navegação - Mais abaixo da logo */}
            <section className="w-full max-w-2xl mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { href: "/home", label: "HOME" },
                        { href: "/shop", label: "SHOP" },
                        { href: "/lookbook", label: "LOOKBOOK" },
                        { href: "/videos", label: "VIDEOS" }
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="group relative bg-white border-2 border-black text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 active:scale-95 text-center text-sm uppercase tracking-wider shadow-lg hover:shadow-2xl"
                        >
                            {item.label}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white rounded-xl transition-all duration-300" />
                        </a>
                    ))}
                </div>
            </section>
        </main>
    )
}