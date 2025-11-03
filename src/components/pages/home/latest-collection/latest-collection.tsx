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

    // Função melhorada para pre-carregar imagens
    const preloadImages = async (imageUrls: string[]): Promise<void> => {
        if (imageUrls.length === 0) return

        const loadImage = (url: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.src = url
                img.onload = () => resolve()
                img.onerror = () => {
                    console.warn(`Failed to load image: ${url}`)
                    resolve() // Continua mesmo com erro
                }
            })
        }

        // Carrega imagens em batches para não sobrecarregar
        const batchSize = 5
        for (let i = 0; i < imageUrls.length; i += batchSize) {
            const batch = imageUrls.slice(i, i + batchSize)
            await Promise.all(batch.map(url => loadImage(url)))
        }
    }

    const loadData = async () => {
        try {
            setIsLoading(true)
            setImagesLoaded(false)

            console.log("🔄 Iniciando carregamento...")

            // 1. Carrega os produtos
            const productsData = await getLatestCollection(supabase)
            console.log("📦 Produtos carregados:", productsData?.length)
            setProducts(productsData || [])

            if (!productsData || productsData.length === 0) {
                console.log("❌ Nenhum produto encontrado")
                setImagesLoaded(true)
                return
            }

            // 2. Coletar TODAS as URLs de imagens de TODOS os produtos
            const allImageUrls: string[] = []
            productsData.forEach((product, index) => {
                console.log(`📸 Produto ${index + 1}:`, product.name, "Imagens:", product.images)

                if (product.images && Array.isArray(product.images)) {
                    product.images.forEach((image, imgIndex) => {
                        if (image && typeof image === 'string') {
                            allImageUrls.push(image)
                            console.log(`   → Imagem ${imgIndex + 1}:`, image)
                        }
                    })
                }
            })

            console.log("🖼️ Total de imagens para carregar:", allImageUrls.length)

            if (allImageUrls.length > 0) {
                // 3. Pre-carregar TODAS as imagens
                console.log("⏳ Pre-carregando imagens...")
                await preloadImages(allImageUrls)
                console.log("✅ Todas as imagens pré-carregadas!")
            }

        } catch (error) {
            console.error("❌ Erro ao carregar a coleção:", error)
        } finally {
            // 4. Marcar como carregado
            console.log("🎯 Carregamento finalizado!")
            setImagesLoaded(true)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // Efeito do carrossel automático - APENAS quando tudo estiver pronto
    useEffect(() => {
        if (!scrollContainerRef.current || products.length === 0 || !imagesLoaded) return

        console.log("🎠 Iniciando carrossel automático...")

        const autoScroll = () => {
            setCurrentIndex(prev => {
                const nextIndex = (prev + 1) % products.length
                return nextIndex
            })
        }

        autoScrollRef.current = setInterval(autoScroll, 3000)

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current)
            }
        }
    }, [products.length, imagesLoaded])

    // Efeito para scroll suave
    useEffect(() => {
        if (scrollContainerRef.current && products.length > 0 && imagesLoaded) {
            const itemWidth = 288 // w-72
            const scrollPosition = currentIndex * itemWidth

            scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
    }, [currentIndex, products.length, imagesLoaded])

    // Controles manuais
    const nextSlide = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
        }
        setCurrentIndex(prev => (prev + 1) % products.length)

        // Reinicia auto-scroll
        setTimeout(() => {
            autoScrollRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % products.length)
            }, 3000)
        }, 100)
    }

    const prevSlide = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
        }
        setCurrentIndex(prev => prev === 0 ? products.length - 1 : prev - 1)

        // Reinicia auto-scroll
        setTimeout(() => {
            autoScrollRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % products.length)
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

    // Loading principal
    if (isLoading || !imagesLoaded) {
        return (
            <section className="w-full py-12 bg-white">
                <div className="w-full">
                    <div className="flex flex-col items-center justify-center mb-12">
                        <div className="w-20 h-0.5 bg-gray-300 mb-4"></div>
                        <h3 className="font-bold uppercase text-2xl md:text-3xl tracking-wider text-center">
                            LATEST COLLECTION
                        </h3>
                        <p className="text-gray-600 mt-3 text-center max-w-2xl">
                            Descubra as peças mais recentes da nossa coleção exclusiva
                        </p>
                    </div>

                    <div className="flex gap-6 md:gap-8 overflow-hidden justify-center">
                        {Array.from({ length: Math.min(4, products.length || 4) }).map((_, index) => (
                            <ProductSkeleton key={`skeleton-${index}`} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                        <span className="ml-3 text-gray-600">
                            {!imagesLoaded ? "Carregando imagens..." : "Carregando produtos..."}
                        </span>
                    </div>
                </div>
            </section>
        )
    }

    // Conteúdo principal - SÓ quando tudo estiver carregado
    return (
        <section className="w-full py-12 bg-white">
            <div className="w-full">
                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="w-20 h-0.5 bg-gray-300 mb-4"></div>
                    <h3 className="font-bold uppercase text-2xl md:text-3xl tracking-wider text-center">
                        LATEST COLLECTION
                    </h3>
                    <p className="text-gray-600 mt-3 text-center max-w-2xl">
                        Descubra as peças mais recentes da nossa coleção exclusiva
                    </p>
                </div>

                {products.length > 0 ? (
                    <>
                        <div className="relative group">
                            {/* Botões de navegação */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Produto anterior"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Próximo produto"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Container do carrossel - SEM DUPLICAÇÃO */}
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full px-4"
                                style={{ scrollBehavior: 'smooth' }}
                            >
                                {products.map((product, index) => (
                                    <div
                                        key={`product-${product.id}-${index}`}
                                        className="flex-shrink-0 w-72 snap-start"
                                    >
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

                        {/* Indicadores */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                            ? 'bg-black w-4'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Ir para produto ${index + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center mt-12">
                            <a
                                href="/shop"
                                className="bg-black text-white px-12 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-300 font-medium"
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