"use client"

import React, { createContext, useContext, useMemo, useState } from "react"
import { Database } from "@/supabase/database"

type CartAction = | { type: "REMOVE_ITEM", productId: number } | { type: "ADD_ITEM", product: Database["public"]["Tables"]["products"]["Row"], size?: Database["public"]["Enums"]["size"] }

export type CartItem = {
    productId: number
    name: string
    price: number
    image: string
    size?: Database["public"]["Enums"]["size"]
    quantity: number
}

const CartContext = createContext<{ cart: CartItem[], setCart: (cart: CartItem[]) => void } | undefined>(undefined)

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    const currentCart = JSON.parse(JSON.stringify(state)) as CartItem[]

    switch (action.type) {
        case "ADD_ITEM": {
            const { product, size } = action
            const existingItem = currentCart.find(item => item.productId === product.id)

            if (!existingItem)
                currentCart.push({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    quantity: 1,
                    size,
                })

            else if (size && existingItem?.size != action.size)
                existingItem!.size = action.size

            return currentCart
        }
        case "REMOVE_ITEM":
            const existingItemIndex = currentCart.findIndex(item => item.productId === action.productId)
            if (existingItemIndex >= 0) currentCart.splice(existingItemIndex, 1)
            return currentCart
        default:
            return currentCart
    }
}

export const CartProvider = ({ children, data }: { children: React.ReactNode, data: CartItem[] }) => {
    const [cart, setCart] = useState<CartItem[]>(data)

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used within a CartProvider")

    const { cart, setCart } = context

    const addCartItem = (product: Database["public"]["Tables"]["products"]["Row"], size?: Database["public"]["Enums"]["size"]) => setCart(cartReducer(cart, { type: "ADD_ITEM", product, size }))
    const removeCartItem = (productId: number) => setCart(cartReducer(cart, { type: "REMOVE_ITEM", productId }))

    return useMemo(
        () => ({
            items: cart,
            addCartItem,
            removeCartItem
        }),
        [context]
    )
}