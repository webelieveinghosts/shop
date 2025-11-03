"use client"

import { useState } from "react"

export const ProductGallery = ({ id, images }: { id: number, images: string[] }) => {
    const [image, setImage] = useState(0)

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Miniaturas - agora em cima no mobile, lado esquerdo no desktop */}
            <div className="flex sm:flex-col gap-2 sm:w-16 max-sm:order-2">
                {images.map((target, index) => (
                    <img
                        src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${target}`}
                        alt={`Image-${index}`}
                        key={`Image-${index}`}
                        className={`aspect-[1/1] object-cover object-top w-16 h-16 sm:w-full cursor-pointer border-b-2 sm:border-b-0 sm:border-l-2 ${image === index ? "border-primary" : "border-transparent"
                            }`}
                        onClick={() => image !== index && setImage(index)}
                    />
                ))}
            </div>

            {/* Imagem principal */}
            <div className="flex-1 max-sm:order-1">
                {images.map((target, index) => (
                    <img
                        src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${target}`}
                        alt={`Image-${index}`}
                        key={`Image-${index}`}
                        className={`w-full aspect-[3/4] object-cover ${image !== index && "hidden"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}