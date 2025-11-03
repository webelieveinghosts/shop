export default async function Main() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-6">
            <section className="max-w-3xl text-center space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                    We Believe in Ghosts
                </h1>

                <p className="text-gray-400 text-lg md:text-xl">
                    a new dimension of underground — bold, minimal and timeless.
                </p>

                <div className="flex justify-center pt-6">
                    <a
                        href="/home"
                        className="px-6 py-3 bg-white text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Enter Store
                    </a>
                </div>
            </section>
        </main>
    )
}
