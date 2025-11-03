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

    // Efeito de scroll automático em loop
    useEffect(() => {
        if (!scrollContainerRef.current || products.length === 0) return

        const scrollContainer = scrollContainerRef.current
        const scrollWidth = scrollContainer.scrollWidth
        const clientWidth = scrollContainer.clientWidth
        const maxScrollLeft = scrollWidth - clientWidth

        const autoScroll = setInterval(() => {
            setCurrentIndex(prev => {
                const nextIndex = prev + 1
                if (nextIndex * 300 >= maxScrollLeft) {
                    // Volta ao início suavemente
                    setTimeout(() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'instant' })
                        }
                    }, 50)
                    return 0
                }
                return nextIndex
            })
        }, 3000) // Muda a cada 3 segundos

        return () => clearInterval(autoScroll)
    }, [products.length])

    // Efeito para atualizar o scroll quando currentIndex muda
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: currentIndex * 300,
                behavior: 'smooth'
            })
        }
    }, [currentIndex])

    const nextSlide = () => {
        if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current
            const scrollWidth = scrollContainer.scrollWidth
            const clientWidth = scrollContainer.clientWidth
            const maxScrollLeft = scrollWidth - clientWidth

            setCurrentIndex(prev => {
                const nextIndex = prev + 1
                if (nextIndex * 300 >= maxScrollLeft) {
                    setTimeout(() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'instant' })
                        }
                    }, 50)
                    return 0
                }
                return nextIndex
            })
        }
    }

    const prevSlide = () => {
        if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current
            const scrollWidth = scrollContainer.scrollWidth
            const clientWidth = scrollContainer.clientWidth
            const maxScrollLeft = scrollWidth - clientWidth

            setCurrentIndex(prev => {
                if (prev === 0) {
                    // Vai para o final
                    setTimeout(() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({
                                left: maxScrollLeft,
                                behavior: 'instant'
                            })
                        }
                    }, 50)
                    return Math.floor(maxScrollLeft / 300)
                }
                return prev - 1
            })
        }
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
        <section className="px-4 py-12 bg-white">
            <div className="max-w-7xl mx-auto">
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
                        <div className="relative group">
                            {/* Botões de navegação */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                aria-label="Produto anterior"
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                aria-label="Próximo produto"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>

                            {/* Carrossel de produtos */}
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
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

                                {/* Duplicar os produtos para efeito de loop contínuo */}
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
                        <div className="flex justify-center mt-6 space-x-2">
                            {products.slice(0, Math.min(products.length, 5)).map((_, index) => (
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

                        {/* Botão Acessar Loja */}
                        <div className="flex justify-center mt-12">
                            <a
                                href="/loja"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white font-medium uppercase tracking-wider transition-all duration-300 hover:bg-gray-800 hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10">Acessar Loja Completa</span>
                                <ChevronRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                <div className="absolute inset-0 border-2 border-black transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
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