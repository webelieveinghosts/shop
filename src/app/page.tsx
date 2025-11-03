import { Logo } from "../components/ui/logo/logo"
export default async function Main() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-6">
            {/* Logo Grande */}
            <div className="flex-1 flex items-center justify-center mb-12"> {/* 48px = 12 em Tailwind */}
                <div className="flex items-center justify-center">
                    <Logo className="h-48 md:h-64 lg:h-80 w-auto" />
                </div>
            </div>

            {/* Navegação - 48px abaixo da logo */}
            <section className="w-full max-w-md mb-16">
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-3">
                    {[
                        { href: "/home", label: "HOME" },
                        { href: "/shop", label: "SHOP" },
                        { href: "/lookbook", label: "LOOKBOOK" },
                        { href: "/videos", label: "VIDEOS" }
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition text-center font-medium text-sm uppercase tracking-wide w-full md:w-auto"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </section>
        </main>
    )
}