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
    const preloadImages = async (imageUrls: string[]): Promise<boolean> => {
        if (imageUrls.length === 0) return true

        const promises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.src = url
                img.onload = () => resolve(url)
                img.onerror = () => reject(url)
            })
        })

        try {
            await Promise.all(promises)
            return true
        } catch (error) {
            console.error("Algumas imagens falharam ao carregar:", error)
            return true // Continua mesmo com erro
        }
    }

    const loadData = async () => {
        try {
            setIsLoading(true)
            setImagesLoaded(false)

            // 1. Primeiro carrega os produtos
            const productsData = await getLatestCollection(supabase)
            setProducts(productsData || [])

            if (!productsData || productsData.length === 0) {
                setImagesLoaded(true)
                return
            }

            // 2. Coletar TODAS as URLs de imagens
            const allImageUrls: string[] = []
            productsData.forEach(product => {
                if (product.images && Array.isArray(product.images)) {
                    product.images.forEach(image => {
                        if (image && typeof image === 'string') {
                            allImageUrls.push(image)
                        }
                    })
                }
            })

            // 3. Pre-carregar TODAS as imagens antes de continuar
            await preloadImages(allImageUrls)

        } catch (error) {
            console.error("Erro ao carregar a coleção:", error)
        } finally {
            // 4. SÓ DEPOIS que tudo carregou, mostra o conteúdo
            setImagesLoaded(true)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // Efeitos do carrossel - SÓ RODAM quando imagesLoaded = true
    useEffect(() => {
        if (!scrollContainerRef.current || products.length === 0 || !imagesLoaded) return

        const autoScroll = () => {
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
        }

        autoScrollRef.current = setInterval(autoScroll, 3000)

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current)
            }
        }
    }, [products.length, imagesLoaded])

    useEffect(() => {
        if (scrollContainerRef.current && products.length > 0 && imagesLoaded) {
            const itemWidth = 288
            const scrollPosition = currentIndex * itemWidth

            scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
    }, [currentIndex, products.length, imagesLoaded])

    // Skeleton loading - MOSTRA ATÉ IMAGENS ESTAREM PRONTAS
    const ProductSkeleton = () => (
        <div className="animate-pulse flex-shrink-0 w-72">
            <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    )

    // Loading principal - mostra enquanto carrega TUDO
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
                        {Array.from({ length: 4 }).map((_, index) => (
                            <ProductSkeleton key={`skeleton-${index}`} />
                        ))}
                    </div>

                    {/* Loading spinner adicional */}
                    <div className="flex justify-center items-center mt-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                        <span className="ml-3 text-gray-600">Carregando produtos...</span>
                    </div>
                </div>
            </section>
        )
    }

    // Conteúdo principal - SÓ RENDERIZA quando tudo estiver carregado
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
                        <div className="relative group w-full">
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
                                style={{ scrollBehavior: 'smooth' }}
                            >
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