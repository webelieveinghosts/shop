"use client"

import { useEffect, useState, useCallback } from "react"
import { Product } from "@/components/ui/product/product"
import { Database, Tables } from "@/supabase/database"
import { createClient } from "@/supabase/client"
import { getProductsByCategory } from "@/supabase/queries"

interface CategoryProps {
    category: Tables<"categories">
}

type ProductType = Database["public"]["Tables"]["products"]["Row"]

export const Category = ({ category }: CategoryProps) => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()

    const loadProducts = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const productsData = await getProductsByCategory(supabase, category.id)
            setProducts(productsData || [])
        } catch (err) {
            console.error("Error loading products:", err)
            setError("Failed to load products. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }, [supabase, category.id])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    // Componente de loading simples
    const renderLoadingState = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={`loading-${index}`}
                    className="animate-pulse space-y-3"
                >
                    <div className="bg-gray-200 h-48 w-full rounded-md" />
                    <div className="bg-gray-200 h-4 w-3/4 rounded" />
                    <div className="bg-gray-200 h-4 w-1/2 rounded" />
                </div>
            ))}
        </div>
    )

    const renderErrorState = () => (
        <div className="text-center py-8 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-red-600 mb-2">{error}</p>
            <button
                onClick={loadProducts}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
                Try Again
            </button>
        </div>
    )

    const renderProducts = () => {
        if (products.length === 0) {
            return (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-lg font-medium mb-2">No products found</p>
                    <p className="text-sm">There are no products in this category yet.</p>
                </div>
            )
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5">
                {products.map((product) => (
                    <Product
                        key={`product-${product.id}`}
                        newer={false}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        oldprice={product.oldprice}
                        images={product.images}
                    />
                ))}
            </div>
        )
    }

    return (
        <section
            className="px-4 py-8"
            aria-labelledby={`category-${category.id}-title`}
        >

            {isLoading && renderLoadingState()}
            {error && renderErrorState()}
            {!isLoading && !error && renderProducts()}
        </section>
    )
}