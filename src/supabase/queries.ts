import { cache } from "react"
import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "./database"
import { CartItem } from "@/components/provider/cart-provider"

export const getLatestCollection = cache(async (supabase: SupabaseClient<Database>) => {{
    const { data } = await supabase.from("products").select("*").neq("stock", 0).order("created_at").limit(8)
    return data ?? []
}})

export const getBestSellers = cache(async (supabase: SupabaseClient<Database>) => {{
    const { data } = await supabase.from("products").select("*").neq("stock", 0).order("sales").limit(8)
    return data ?? []
}})

export const getCart = cache(async (supabase: SupabaseClient<Database>, cartId?: string): Promise<CartItem[]> => {
    if (!cartId) return []

    const { data } = await supabase.from("carts").select("*").eq("id", cartId).maybeSingle()
    const items = (data?.items ?? []) as { productId: number, quantity: number, size?: Database["public"]["Enums"]["size"] }[]

    const cart = await Promise.all(items.map(async item => {
        const { data: product } = await supabase.from("products").select("*").eq("id", item.productId).maybeSingle()
        return {
            ...item,
            name: product!.name,
            price: product!.price,
            image: product!.images[0]
        }
    }))

    return cart as CartItem[]
})