import { createClient } from "../client"
import { Database } from "../database"

export const addToCart = async (productId: number, cartId?: string, size?: Database["public"]["Enums"]["size"]) => {
    const supabase = createClient()
    const { data: data } = cartId ? await supabase.from("carts").select("*").eq("id", cartId).maybeSingle() : {}
    console.log(data)
    
    const items = data ? data.items as { productId: number, quantity: number, size?: Database["public"]["Enums"]["size"] }[] : []
    if (items.findIndex(item => item.productId === productId) < 0) items.push({ productId, quantity: 1, size })

    return await supabase.from("carts").upsert({ id: data?.id, items }).select().maybeSingle().then(data => data.data?.id)
}

export const removeFromCart = async (productId: number, cartId?: string) => {
    if (!cartId) return true

    const supabase = createClient()
    const { data } = await supabase.from("carts").select("*").eq("id", cartId).maybeSingle()
    if (!data) return
    
    const items = data.items as any[]
    items.splice(items.findIndex(product => product.productId === productId), 1)

    if (items.length === 0) {
        console.log(cartId)
        await supabase.from("carts").delete().eq("id", cartId)
        return true
    }
    
    else
        await supabase.from("carts").upsert({ id: data.id, items }).select().maybeSingle().then(data => data.data?.id)
}