import "@/styles/product.css"
import { useState } from "react"

export const Product = ({ newer, id, name, price, images }: { newer: boolean, id: number, name: string, price: number, images: string[] }) => {
    const [hovered, setHovered] = useState(false)
    const hasSecondImage = images.length > 1

    const firstImage = `https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${images[0]}?quality=50`
    const secondImage = hasSecondImage
        ? `https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${images[1]}?quality=50`
        : firstImage

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
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
            >
                {/* imagem principal */}
                <img
                    src={firstImage}
                    className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${hovered ? "opacity-0" : "opacity-100"}`}
                    alt={name}
                    decoding="async"
                    loading="lazy"
                    fetchPriority="high"
                />

                {/* imagem secundária */}
                {hasSecondImage && (
                    <img
                        src={secondImage}
                        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${hovered ? "opacity-100" : "opacity-0"}`}
                        alt={name}
                        decoding="async"
                        loading="lazy"
                        fetchPriority="high"
                    />
                )}
            </div>

            <div style={{ paddingBlockStart: "0.7rem" }}>
                <a href={`/product?id=${id}`} className="block absolute w-full h-full z-30 left-0 top-0 no-underline"></a>
                <h3 className="text-xs md:text-xs font-semibold">{name}</h3>
                <div>
                    <span className="text-md md:text-base font-bold">R$ {price.toLocaleString("pt-br")}</span>
                </div>
            </div>
        </div>
    )
}
