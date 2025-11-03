import { Logo } from "../components/ui/logo/logo"

export default async function Main() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-6">
            <div className="flex-1 flex items-center justify-center mb-20">
                <div className="flex items-center justify-center">
                    <Logo className="h-32 md:h-40 w-auto" />
                </div>
            </div>

            <section className="w-full max-w-2xl mb-16">
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
                            className="group relative bg-white border border-black text-black font-medium py-4 px-4 rounded-lg transition-all duration-300 hover:bg-black hover:text-white text-center text-sm uppercase tracking-wider"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </section>
        </main>
    )
}