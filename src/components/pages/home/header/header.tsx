import Slider from "react-slick"

// Import css files
import "@/styles/slick.css"

export const Header = ({ mobile }: { mobile: boolean }) => {
    return (
        <section className="flex mx-auto max-w-screen-2xl px-4">
            <div className="md:col-span-4 md:row-span-2">
                {mobile ?
                    <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-gray-400 hover:border-primary">
                        <img fetchPriority="high" decoding="async" loading="lazy" className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105" src="/image/slide/banner-mobile.webp" />
                    </div> :
                    <div className="group flex items-center justify-center overflow-hidden rounded-lg border border-gray-400 hover:border-primary">
                        <img fetchPriority="high" decoding="async" loading="lazy" className="relative w-full transition duration-300 ease-in-out group-hover:scale-105" src="/image/slide/banner-pc.webp" />
                    </div>
                }
            </div>
        </section >
    )
}