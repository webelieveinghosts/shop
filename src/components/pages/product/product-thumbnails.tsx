"use client"

import { useState, useEffect } from "react"

export const ProductThumbnails = ({ id, images }: { id: number, images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0)

    // Sincronizar com a imagem principal
    useEffect(() => {
        const storedIndex = localStorage.getItem(`product-${id}-selected-image`)
        if (storedIndex) {
            setSelectedImage(Number(storedIndex))
        }
    }, [id])

    const handleImageSelect = (index: number) => {
        setSelectedImage(index)
        // Salvar no localStorage para sincronizar com a imagem principal
        localStorage.setItem(`product-${id}-selected-image`, index.toString())
        // Disparar evento para outros componentes escutarem
        window.dispatchEvent(new Event('storage'))
    }

    return (
        <div className="flex gap-2 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {images.map((target, index) => (
                <img
                    src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${target}`}
                    alt={`Thumbnail-${index}`}
                    key={`Thumbnail-${index}`}
                    className={`w-16 h-16 aspect-[1/1] object-cover object-top cursor-pointer border-2 transition-all duration-300 ${selectedImage === index
                            ? "border-primary"
                            : "border-transparent hover:border-primary"
                        }`}
                    onClick={() => handleImageSelect(index)}
                />
            ))}
        </div>
    )
}