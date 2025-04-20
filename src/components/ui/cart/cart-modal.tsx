"use client";

import clsx from "clsx"
import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { OpenCart } from "./open-cart"
import { ShoppingBasketIcon, XIcon } from "lucide-react"
import { useCart } from "@/components/provider/cart-provider"
import { DeleteItemButton } from "./delete-item-button";
import { parse } from "@/util/translate";
import LoadingDots from "../loading-dots/loading-dots";
import { redirectToCheckout } from "./actions";

const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "narrowSymbol"
})

export const CartModal = () => {
    const cart = useCart()
    const totalPrice = cart.items.reduce((sum, { price }) => sum + price, 0)

    const [isOpen, setIsOpen] = useState(false)
    const quantityRef = useRef(cart.items.reduce((a, { quantity }) => a + quantity, 0))
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    useEffect(() => {
        const totalQuantity = cart.items.reduce((a, { quantity }) => a + quantity, 0)

        // Open cart modal when quantity changes.
        if (totalQuantity !== quantityRef.current) {
            // But only if it's not already open (quantity also changes when editing items in cart).
            if (!isOpen) setIsOpen(true)

            // Always update the quantity reference
            quantityRef.current = totalQuantity
        }
    }, [isOpen, cart.items, quantityRef])

    return (
        <>
            <button aria-label="Open cart" onClick={openCart}>
                <OpenCart quantity={quantityRef.current} />
            </button>
            <Transition show={isOpen}>
                <Dialog onClose={closeCart} className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="opacity-0 backdrop-blur-none"
                        enterTo="opacity-100 backdrop-blur-[.5px]"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="opacity-100 backdrop-blur-[.5px]"
                        leaveTo="opacity-0 backdrop-blur-none"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-gray-100 bg-gray-200/80 p-6 text-black backdrop-blur-xl md:w-[390px]">
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-semibold">Meu carrinho</p>
                                <button aria-label="Close cart" onClick={closeCart}>
                                    <CloseCart />
                                </button>
                            </div>

                            {!cart || cart.items.length === 0 ? (
                                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                                    <ShoppingBasketIcon size={100} className="h-16" strokeWidth={1.2} />
                                    <p className="mt-6 text-center text-2xl font-bold">
                                        Seu carrinho está vázio.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                                    <ul className="grow overflow-auto py-4">
                                        {cart.items.sort((a, b) => a.name.localeCompare(b.name)).map((item, i) => {
                                            return (
                                                <li key={i} className="flex w-full flex-col border-b border-zinc-400">
                                                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                                                        <div className="absolute z-40 -mt-2 ml-[55px]">
                                                            <DeleteItemButton item={item} />
                                                        </div>
                                                        <Link
                                                            href={`/product?id=${item.productId}`}
                                                            onClick={closeCart}
                                                            className="z-30 flex flex-row space-x-4"
                                                        >
                                                            <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded border border-neutral-300 bg-neutral-300">
                                                                <img
                                                                    className="h-full w-full object-cover"
                                                                    width={64}
                                                                    height={64}
                                                                    alt={item.name}
                                                                    src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${item.productId}/${item.image}`}
                                                                />
                                                            </div>

                                                            <div className="flex flex-1 flex-col justify-between">
                                                                <span className="leading-tight font-medium text-black">
                                                                    {item.name}
                                                                </span>
                                                                <div>
                                                                    {item.size && <span className="text-xs text-zinc-700 uppercase font-semibold">
                                                                        Tamanho: {parse(item.size)}
                                                                    </span>}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="flex h-16 flex-col justify-between">
                                                            <p suppressHydrationWarning={true} className="flex justify-end space-y-2 text-right font-bold mt-auto">
                                                                {`${formatter.format(item.price)}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="py-4 text-sm font-semibold text-zinc-600">
                                        <div className="mb-3 flex items-center justify-between border-b border-zinc-400 pb-1 pt-1">
                                            <p>Entrega</p>
                                            <p className="text-right">Calculada no checkout</p>
                                        </div>
                                        <div className="mb-3 flex items-center justify-between border-b border-zinc-400 pb-1 pt-1">
                                            <p>Total</p>
                                            <p suppressHydrationWarning={true} className="text-right text-base text-black">
                                                {`${formatter.format(totalPrice)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <form action={redirectToCheckout}>
                                        <CheckoutButton />
                                    </form>
                                </div>
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition >
        </>
    )
}

function CloseCart({ className }: { className?: string }) {
    return (
        <div className="relative flex h-11 w-11 items-center justify-center border border-black text-black transition-all cursor-pointer group">
            <XIcon className={clsx("h-6 transition-all ease-in-out hover:scale-110", className)} />
        </div>
    )
}

function CheckoutButton() {
    const { pending } = useFormStatus()

    return (
        <button className="block w-full bg-primary p-3 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-primary-hover cursor-pointer disabled:bg-primary-hover" type="submit" disabled={pending}>
            {pending ? <LoadingDots /> : "Ir para o pagamento"}
        </button>
    )
}