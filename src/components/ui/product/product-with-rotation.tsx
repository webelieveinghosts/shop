// components/ui/product/product-with-rotation.tsx
"use client"

import { useState, useEffect } from "react"
import { HeartIcon } from "lucide-react"

interface ProductWithRotationProps {
    id: string
    name: string
    price: number
    images: string[]
    newer?: boolean
    imageRotation?: boolean
    autoRotate?: boolean
    rotationInterval?: number
}

export const ProductWithRotation = ({
    id,
    name,
    price,
    images,
    newer = false,
    imageRotation = true,
    autoRotate = true,
    rotationInterval = 3000
}: ProductWithRotationProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    // Efeito de rotação automática
    useEffect(() => {
        if (!imageRotation || !autoRotate || images.length <= 1 || !isHovering) return

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, rotationInterval)

        return () => clearInterval(interval)
    }, [images.length, autoRotate, imageRotation, isHovering, rotationInterval])

    const handleMouseEnter = () => {
        setIsHovering(true)
        if (imageRotation && images.length > 1) {
            setCurrentImageIndex(0)
        }
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setCurrentImageIndex(0)
    }

    const handleImageClick = () => {
        if (images.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }
    }

    return (
        <div className="group cursor-pointer">
            <div
                className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[3/4] mb-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Imagem principal */}
                <img
                    src={images[currentImageIndex]}
                    alt={name}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
                    onClick={handleImageClick}
                />

                {/* Indicadores de imagem (dots) */}
                {imageRotation && images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                        ? 'bg-white scale-110'
                                        : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Badge New */}
                {newer && (
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
                        New
                    </div>
                )}

                {/* Botão de favorito */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                    <HeartIcon className="w-4 h-4" />
                </button>

                {/* Overlay de hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
            </div>

            {/* Informações do produto */}
            <div className="space-y-1">
                <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-2">
                    {name}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                    {formatter.format(price)}
                </p>
                {images.length > 1 && (
                    <p className="text-xs text-gray-500">
                        {images.length} cores/versões disponíveis
                    </p>
                )}
            </div>
        </div>
    )
}