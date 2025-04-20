"use client"

import { useEffect, useState } from "react"
import { Product } from "@/components/ui/product/product"
import { Database } from "@/supabase/database"
import { createClient } from "@/supabase/client"
import { getLatestCollection } from "@/supabase/queries"

export const LatestCollection = () => {
    const [products, setProducts] = useState<Database["public"]["Tables"]["products"]["Row"][]>()

    const supabase = createClient()
    const load = async () => {
        const products = await getLatestCollection(supabase)
        setProducts(products)
    }

    useEffect(() => {
        load()
    }, [])
    
    return (
        <div className="px-4">
            <div className="flex w-full items-center justify-between mb-4">
                <h3 className="font-bold uppercase">NONVIOLENT COMMUNICATION</h3>
                {/*<a className="text-sm uppercase underline cursor-pointer hover:no-underline">Ver Tudo</a>*/}
            </div>

            <div className="grid grid-cols-1 grid-rows-8 md:grid-cols-4 md:grid-rows-2 gap-2">
                {products ? products.map(product => <Product key={`product-${product.id}`} newer={true} id={product.id} name={product.name} price={product.price} images={product.images} />) : <></>}
            </div>
        </div>
    )
}