import { AddToCart } from "@/components/pages/product/add-to-cart"
import { ProductGallery } from "@/components/pages/product/product-gallery"
import { getProduct } from "@/supabase/product/server"
import { redirect } from "next/navigation"

const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "narrowSymbol"
})

export default async function ProductPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const id = await searchParams.then(params => Number(params.id))
    if (!id)
        return redirect("/")

    const product = await getProduct(id)

    if (!product)
        return redirect("/")

    return (
        <div className="flex w-full pt-6 px-4">
            <div className="flex flex-col md:flex-row items-start gap-8 max-lg:gap-12 max-sm:gap-8">
                <div className="w-full lg:w-3/5 lg:sticky top-0">
                    <ProductGallery id={id} images={product.images} />
                </div>

                <div className="w-full lg:w-2/5 overflow-hidden">
                    <div>
                        <h3 className="font-semibold uppercase">{product.name}</h3>
                        <h4 className="text-slate-500 mt-2 font-semibold">{formatter.format(product.price)}</h4>
                    </div>

                    <AddToCart product={product} sizes={product.sizes} />

                    <hr className="my-6 border-slate-300" />

                    <div>
                        <h3 className="font-semibold uppercase">Descrição</h3>
                        <div className="mt-2 text-sm text-slate-500 leading-relaxed" role="accordion">
                            {product.description}
                        </div>
                    </div>

                    {product.sizes_view && <div>
                        <hr className="my-6 border-slate-300" />
                        <img src={product.sizes_view} />
                    </div>}
                </div>
            </div>
        </div>
    )
}