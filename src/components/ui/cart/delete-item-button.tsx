"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import clsx from "clsx"
import { CartItem, useCart } from "@/components/provider/cart-provider"
import { removeItem } from "./actions"
import { XIcon } from "lucide-react"

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                if (pending) e.preventDefault();
            }}
            aria-label="Remove cart item"
            aria-disabled={pending}
            className={clsx(
                "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
                {
                    "cursor-not-allowed px-0": pending
                }
            )}>
            {/*<LoadingDots className="bg-white" />*/}
            {pending ? (
                <div />
            ) : (
                <XIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white" />
            )}
        </button>
    );
}

export const DeleteItemButton = ({ item }: { item: CartItem }) => {
    const cart = useCart()
    const [message, formAction] = useActionState(removeItem, null)
    const actionWithVariant = () => {
        cart.removeCartItem(item.productId)
        formAction.bind(null, item.productId)()
    }

    return (
        <form action={actionWithVariant}>
            <SubmitButton />
            <p aria-live="polite" className="sr-only" role="status">
                {message}
            </p>
        </form>
    )
}