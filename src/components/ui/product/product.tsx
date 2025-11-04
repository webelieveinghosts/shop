"use client"
import { useState } from "react"
import "@/styles/product.css"

export const Product = ({
    newer,
    id,
    name,
    price,
    images
}: {
    newer: boolean
    id: number
    name: string
    price: number
    images: string[]
}) => {
    const [currentImage, setCurrentImage] = useState(0)

    const handleMouseEnter = () => {
        if (images.length > 1) {
            setCurrentImage(1)
        }
    }

    const handleMouseLeave = () => {
        if (images.length > 1) {
            setCurrentImage(0)
        }
    }

    return (
        <div className="relative w-full">
            {newer && (
                <div className="absolute top-2.5 left-2.5 uppercase z-40">
                    <div className="flex gap-1.5">
                        <div className="flex h-auto px-2 py-1 leading-normal bg-white rounded-xs text-[0.6rem] font-semibold">
                            NEW
                        </div>
                    </div>
                </div>
            )}

            <div
                className="flex items-center justify-center relative overflow-hidden rounded-md border-2 border-transparent transition-all duration-300 hover:border-primary hover:shadow-md"
                style={{ aspectRatio: "1/1" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="relative max-w-full w-full h-full">
                    <img
                        decoding="async"
                        loading="lazy"
                        fetchPriority="high"
                        src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${images[currentImage]}?quality=50`}
                        className="max-w-full object-cover w-full h-full pointer-events-none select-none transition-opacity duration-500"
                    />
                </div>
            </div>

            <div style={{ paddingBlockStart: "0.7rem" }}>
                <a
                    href={`/product?id=${id}`}
                    className="block absolute w-full h-full z-30 left-0 top-0 no-underline"
                ></a>
                <h3 className="text-xs md:text-xs font-semibold">{name}</h3>
                <div>
                    <span className="text-md md:text-base font-bold">
                        R$ {price.toLocaleString("pt-br")}
                    </span>
                </div>
            </div>
        </div>
    )
}
