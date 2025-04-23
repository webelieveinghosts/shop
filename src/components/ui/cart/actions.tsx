"use server"

import { addToCart, removeFromCart } from "@/supabase/cart/client"
import { Database } from "@/supabase/database"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const addItem = async (prevState: any, { productId, size }: { productId: number, size?: Database["public"]["Enums"]["size"] }) => {
    const cartId = await cookies().then(cookies => cookies.get("cartId")?.value)

    try {
        const id = await addToCart(productId, cartId, size)
        await cookies().then(cookies => cookies.set("cartId", id!.toString()))
    } catch (e) {

    }
}

export const removeItem = async (prevState: any, productId: number) => {
    const cartId = await cookies().then(cookies => cookies.get("cartId")?.value)

    try {
        const deleted = await removeFromCart(productId, cartId)
        if (deleted) await cookies().then(cookies => cookies.delete("cartId"))
    } catch (e) {
        return 'Error updating item quantity'
    }
}


export const redirectToCheckout = async () => {
    const cartId = await cookies().then(cookies => cookies.get("cartId")?.value)
    redirect(`https://checkout.webelieveinghosts.com.br/${cartId}`)
}