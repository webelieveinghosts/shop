import { AddToCart } from "@/components/pages/product/add-to-cart"
import { ProductMainImage } from "@/components/pages/product/product-main-image"
import { ProductThumbnails } from "@/components/pages/product/product-thumbnails"
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
            <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
                {/* Imagem principal - mantém no lado direito */}
                <div className="w-full lg:w-3/5 lg:sticky lg:top-0">
                    <ProductMainImage id={id} images={product.images} />
                </div>

                {/* Informações do produto + miniaturas */}
                <div className="w-full lg:w-2/5 overflow-hidden">
                    <div>
                        <h3 className="font-semibold uppercase">{product.name}</h3>
                        <h4 className="text-slate-500 mt-2 font-semibold">{formatter.format(product.price)}</h4>
                    </div>

                    <AddToCart product={product} sizes={product.sizes} />

                    {/* Miniaturas - agora abaixo do botão */}
                    <div className="mt-6">
                        <h3 className="font-semibold uppercase mb-2">Selecionar Imagem</h3>
                        <ProductThumbnails id={id} images={product.images} />
                    </div>

                    <hr className="my-6 border-slate-300" />

                    <div>
                        <h3 className="font-semibold uppercase">Descrição</h3>
                        <div className="mt-2 text-sm text-slate-500 leading-relaxed whitespace-pre-wrap" role="accordion">
                            {product.description}
                        </div>
                    </div>

                    {product.sizes_view && <div>
                        <hr className="my-6 border-slate-300" />
                        <img src={product.sizes_view} alt="Tabela de tamanhos" />
                    </div>}
                </div>
            </div>
        </div>
    )
}