import { ShoppingBasketIcon } from "lucide-react"
import clsx from "clsx"

export const OpenCart = ({ className, quantity }: { className?: string, quantity?: number }) => {
    return (
        <div className="relative flex h-11 w-11 items-center justify-center rounded border border-neutral-200 text-black transition-all cursor-pointer group">
            <ShoppingBasketIcon className={clsx("w-5 transition-all group-hover:scale-110", className)} strokeWidth={1.2} />

            {quantity ? (
                <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-primary text-[11px] font-medium text-white">
                    {quantity}
                </div>
            ) : null}
        </div>
    )
}