"use client"

import { useEffect, useState, useRef } from "react"
import { Product } from "@/components/ui/product/product"
import { Database } from "@/supabase/database"
import { createClient } from "@/supabase/client"
import { getLatestCollection } from "@/supabase/queries"

export const LatestCollection = () => {
    const [products, setProducts] = useState<Database["public"]["Tables"]["products"]["Row"][]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

    const supabase = createClient()

    // Função para pre-carregar todas as imagens
    const preloadImages = async (imageUrls: string[]) => {
        const promises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.src = url
                img.onload = resolve
                img.onerror = reject
            })
        })

        try {
            await Promise.all(promises)
            setImagesLoaded(true)
        } catch (error) {
            console.error("Erro ao carregar imagens:", error)
            // Mesmo com erro, continuamos para não travar a UI
            setImagesLoaded(true)
        }
    }

    const load = async () => {
        try {
            setIsLoading(true)
            setImagesLoaded(false)
            const products = await getLatestCollection(supabase)
            setProducts(products || [])

            // Coletar todas as URLs de imagens dos produtos
            const allImageUrls: string[] = []
            products?.forEach(product => {
                if (product.images && Array.isArray(product.images)) {
                    product.images.forEach(image => {
                        if (image && typeof image === 'string') {
                            allImageUrls.push(image)
                        }
                    })
                }
            })

            // Pre-carregar imagens
            if (allImageUrls.length > 0) {
                await preloadImages(allImageUrls)
            } else {
                setImagesLoaded(true)
            }

        } catch (error) {
            console.error("Erro ao carregar a coleção:", error)
            setImagesLoaded(true) // Garante que a UI não trave em caso de erro
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    // Efeito de scroll automático em loop infinito
    useEffect(() => {
        if (!scrollContainerRef.current || products.length === 0 || !imagesLoaded) return

        const scrollContainer = scrollContainerRef.current
        const itemWidth = 288 // w-72 = 288px
        const totalItems = products.length * 2 // Porque duplicamos os produtos

        const autoScroll = () => {
            setCurrentIndex(prev => {
                const nextIndex = (prev + 1) % totalItems

                // Se chegou no final da lista duplicada, volta suavemente para o início
                if (nextIndex === products.length) {
                    setTimeout(() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({
                                left: 0,
                                behavior: 'instant'
                            })
                        }
                    }, 50)
                    return 0
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
    }, [products.length, imagesLoaded]) // Adicionamos imagesLoaded como dependência

    // Efeito para atualizar o scroll quando currentIndex muda
    useEffect(() => {
        if (scrollContainerRef.current && products.length > 0 && imagesLoaded) {
            const itemWidth = 288 // w-72 = 288px
            const scrollPosition = currentIndex * itemWidth

            scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
    }, [currentIndex, products.length, imagesLoaded])

    const nextSlide = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
        }

        setCurrentIndex(prev => {
            const totalItems = products.length * 2
            const nextIndex = (prev + 1) % totalItems

            if (nextIndex === products.length) {
                setTimeout(() => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({
                            left: 0,
                            behavior: 'instant'
                        })
                    }
                }, 50)
                return 0
            }

            return nextIndex
        })

        // Reinicia o auto scroll após interação manual
        setTimeout(() => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current)
            }
            autoScrollRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % (products.length * 2))
            }, 3000)
        }, 100)
    }

    const prevSlide = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
        }

        setCurrentIndex(prev => {
            const totalItems = products.length * 2
            const prevIndex = prev === 0 ? totalItems - 1 : prev - 1

            if (prevIndex === totalItems - 1) {
                setTimeout(() => {
                    if (scrollContainerRef.current) {
                        const totalWidth = 288 * totalItems
                        scrollContainerRef.current.scrollTo({
                            left: totalWidth,
                            behavior: 'instant'
                        })
                    }
                }, 50)
                return totalItems - 1
            }

            return prevIndex
        })

        // Reinicia o auto scroll após interação manual
        setTimeout(() => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current)
            }
            autoScrollRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % (products.length * 2))
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
                        {/* Loading adicional para imagens */}
                        {!imagesLoaded && (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                                <span className="ml-3 text-gray-600">Carregando imagens...</span>
                            </div>
                        )}

                        <div
                            className="relative group w-full"
                            style={{ opacity: imagesLoaded ? 1 : 0.5, transition: 'opacity 0.3s' }}
                        >
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
                                style={{ scrollBehavior: 'smooth' }}
                            >
                                {/* Primeira cópia dos produtos */}
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

                                {/* Segunda cópia dos produtos para loop infinito */}
                                {products.map(product => (
                                    <div key={`product-duplicate-${product.id}`} className="flex-shrink-0 w-72 snap-start">
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
                        {imagesLoaded && (
                            <div className="flex justify-center mt-6 space-x-2">
                                {products.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex % products.length === index
                                            ? 'bg-black w-4'
                                            : 'bg-gray-300'
                                            }`}
                                        aria-label={`Ir para produto ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}

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