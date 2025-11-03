"use client"

import { useState, useEffect } from "react"

export const ProductMainImage = ({ id, images }: { id: number, images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0)

    // Usar useEffect para sincronizar com as thumbnails via localStorage ou context
    useEffect(() => {
        const handleStorageChange = () => {
            const storedIndex = localStorage.getItem(`product-${id}-selected-image`)
            if (storedIndex) {
                setSelectedImage(Number(storedIndex))
            }
        }

        // Verificar se já existe uma imagem selecionada
        const storedIndex = localStorage.getItem(`product-${id}-selected-image`)
        if (storedIndex) {
            setSelectedImage(Number(storedIndex))
        }

        // Escutar mudanças no localStorage
        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [id])

    return (
        <div className="w-full">
            <img
                src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${images[selectedImage]}`}
                alt={`Product-image-${selectedImage}`}
                className="w-full aspect-[1/1] object-cover"
            />
        </div>
    )
}