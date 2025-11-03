"use client"

import { useEffect, useState, useRef } from "react"
import { Product } from "@/components/ui/product/product"
import { Database } from "@/supabase/database"
import { createClient } from "@/supabase/client"
import { getLatestCollection } from "@/supabase/queries"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"

export const LatestCollection = () => {
    const [products, setProducts] = useState<Database["public"]["Tables"]["products"]["Row"][]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

    const supabase = createClient()

    const load = async () => {
        try {
            setIsLoading(true)
            const products = await getLatestCollection(supabase)
            setProducts(products || [])
        } catch (error) {
            console.error("Erro ao carregar a coleção:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    // Efeito de scroll automático em loop infinito
    useEffect(() => {
        if (!scrollContainerRef.current || products.length === 0) return

        const autoScroll = () => {
            setCurrentIndex(prev => {
                const nextIndex = prev + 1

                // Se chegou no final, continua do próximo item (loop infinito)
                if (nextIndex >= products.length) {
                    return 0 // Volta para o primeiro item
                }

                return nextIndex
            })
        }

        autoScrollRef.current = setInterval(autoScroll, 3000)

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current)
            }
        }
    }, [products.length])

    // Efeito para atualizar o scroll quando currentIndex muda
    useEffect(() => {
        if (scrollContainerRef.current && products.length > 0) {
            const itemWidth = 288 // w-72 = 288px
            const scrollPosition = currentIndex * itemWidth

            scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
    }, [currentIndex, products.length])

    const nextSlide = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
        }

        setCurrentIndex(prev => {
            const nextIndex = prev + 1
            return nextIndex >= products.length ? 0 : nextIndex
        })

        // Reinicia o auto scroll após interação manual
        setTimeout(() => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current)
            }
            autoScrollRef.current = setInterval(() => {
                setCurrentIndex(prev => {
                    const nextIndex = prev + 1
                    return nextIndex >= products.length ? 0 : nextIndex
                })
            }, 3000)
        }, 100)
    }

    const prevSlide = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
        }

        setCurrentIndex(prev => {
            const prevIndex = prev - 1
            return prevIndex < 0 ? products.length - 1 : prevIndex
        })

        // Reinicia o auto scroll após interação manual
        setTimeout(() => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current)
            }
            autoScrollRef.current = setInterval(() => {
                setCurrentIndex(prev => {
                    const nextIndex = prev + 1
                    return nextIndex >= products.length ? 0 : nextIndex
                })
            }, 3000)
        }, 100)
    }

    // Skeleton loading
    const ProductSkeleton = () => (
        <div className="animate-pulse flex-shrink-0 w-72">
            <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    )

    return (
        <section className="w-full py-12 bg-white">
            <div className="w-full">
                {/* Header centralizado */}
                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="w-20 h-0.5 bg-gray-300 mb-4"></div>
                    <h3 className="font-bold uppercase text-2xl md:text-3xl tracking-wider text-center">
                        LATEST COLLECTION
                    </h3>
                    <p className="text-gray-600 mt-3 text-center max-w-2xl">
                        Descubra as peças mais recentes da nossa coleção exclusiva
                    </p>
                </div>

                {/* Container do carrossel */}
                {isLoading ? (
                    <div className="flex gap-6 md:gap-8 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <ProductSkeleton key={`skeleton-${index}`} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <div className="relative group w-full">
                            {/* Botões de navegação */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-10 transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Produto anterior"
                            >
                                <ChevronLeftIcon size={20} />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-10 transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Próximo produto"
                            >
                                <ChevronRightIcon size={20} />
                            </button>

                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
                                style={{ scrollBehavior: 'smooth' }}
                            >
                                {/* Apenas uma cópia dos produtos */}
                                {products.map(product => (
                                    <div key={`product-${product.id}`} className="flex-shrink-0 w-72 snap-start">
                                        <Product
                                            newer={true}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            images={product.images}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Indicadores de posição */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                        ? 'bg-black w-4'
                                        : 'bg-gray-300'
                                        }`}
                                    aria-label={`Ir para produto ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Botão Acessar Loja */}
                        <div className="flex justify-center mt-12">
                            <a
                                href="/shop"
                                className="bg-black text-white px-12 py-2 rounded-2xl hover:bg-gray-800 transition"
                            >
                                Acessar Loja Completa
                            </a>
                        </div>

                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Nenhum produto encontrado na coleção.</p>
                    </div>
                )}
            </div>
        </section>
    )
}