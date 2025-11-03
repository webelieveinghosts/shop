"use client"

import { useState, useEffect } from "react"

export const ProductMainImage = ({ id, images }: { id: number, images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        const handleStorageChange = () => {
            const storedIndex = localStorage.getItem(`product-${id}-selected-image`)
            if (storedIndex) {
                setSelectedImage(Number(storedIndex))
            }
        }

        const storedIndex = localStorage.getItem(`product-${id}-selected-image`)
        if (storedIndex) {
            setSelectedImage(Number(storedIndex))
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [id])

    return (
        <div className="w-full max-w-2xl mx-auto">
            <img
                src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${images[selectedImage]}`}
                alt={`Product-image-${selectedImage}`}
                className="w-full aspect-[1/1] object-cover"
            />
        </div>
    )
}