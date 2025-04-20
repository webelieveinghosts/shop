"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { useCart } from "@/components/provider/cart-provider"
import { addItem } from "@/components/ui/cart/actions"
import { Database } from "@/supabase/database"
import { parse } from "@/util/translate"
import LoadingDots from "@/components/ui/loading-dots/loading-dots"

export const AddToCart = ({ product, sizes }: { product: Database["public"]["Tables"]["products"]["Row"], sizes?: Database["public"]["Enums"]["size"][] }) => {
    const cart = useCart()
    const [size, setSize] = useState<Database["public"]["Enums"]["size"] | undefined>(sizes ? sizes[0] : undefined)

    const [message, formAction] = useActionState(addItem, null)
    const actionWithVariant = () => {
        cart.addCartItem(product)
        formAction.bind(null, { productId: product.id, size })()
    }

    return (
        <form action={actionWithVariant}>
            {sizes && sizes.length > 0 && <div>
                <hr className="my-6 border-slate-300" />
                <h3 className="font-semibold uppercase">Tamanhos</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                    {sizes.map((target, index) => <button key={`size-${index}`} type="button" className={`w-14 h-8 border hover:border-primary-hover text-sm  flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer ${size === target ? "border-primary-hover" : "border-slate-300"}`} onClick={() => size !== target && setSize(target)}>{parse(target)}</button>)}
                </div>
            </div>}

            <AddButton />
        </form>
    )
}

const AddButton = () => {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="mt-6 px-4 py-3 w-full border border-primary bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all duration-300 cursor-pointer disabled:bg-primary-hover" disabled={pending} onClick={event => pending && event.preventDefault()}>{pending ? <LoadingDots /> : "Adicionar ao carrinho"}</button>
    )
}