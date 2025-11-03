"use client"

import { useEffect, useState } from "react"
import { Product } from "@/components/ui/product/product"
import { Database } from "@/supabase/database"
import { createClient } from "@/supabase/client"
import { getLatestCollection } from "@/supabase/queries"
import { ChevronRightIcon } from "lucide-react"

export const LatestCollection = () => {
    const [products, setProducts] = useState<Database["public"]["Tables"]["products"]["Row"][]>([])
    const [isLoading, setIsLoading] = useState(true)

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

    // Skeleton loading
    const ProductSkeleton = () => (
        <div className="animate-pulse">
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

                {/* Grid de produtos */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <ProductSkeleton key={`skeleton-${index}`} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                            {products.map(product => (
                                <Product
                                    key={`product-${product.id}`}
                                    newer={true}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    images={product.images}
                                // Adicione estas props se seu componente Product suportar
                                // imageRotation={true}
                                // autoRotate={true}
                                />
                            ))}
                        </div>

                        {/* Botão Acessar Loja */}
                        <div className="flex justify-center">
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