"use client"

import { useEffect, useState } from "react"

// Import css files
import "@/styles/slick.css"

export const Header = () => {
    const [mobile, setMobile] = useState<boolean>()

    useEffect(() => {
        if (document) setMobile(window.matchMedia("(max-width: 48rem)").matches)
    }, [])

    return mobile !== undefined && (
        <section className="flex items-center justify-center w-full min-h-[300px] md:min-h-[500px] px-4">
            <div className="w-full max-w-screen-2xl">
                <div className="group flex items-center justify-center overflow-hidden rounded-lg border border-gray-400 hover:border-primary">
                    <img
                        fetchPriority="high"
                        decoding="async"
                        loading="lazy"
                        className="w-full h-auto md:h-[500px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={mobile ? "/image/slide/banner-mobile.webp" : "/image/slide/banner-pc.webp"}
                    />
                </div>
            </div>
        </section>
    )
}
