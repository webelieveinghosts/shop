"use client"

import { useState } from "react"

export const ProductGallery = ({ id, images }: { id: number, images: string[] }) => {
    const [image, setImage] = useState(0)

    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2 w-16 max-sm:w-14 shrink-0">
                {images.map((target, index) => <img src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${target}`} alt={`Image-${index}`} key={`Image-${index}`} className={`aspect-[1/1] object-cover object-top w-full cursor-pointer  border-b-2 ${image === index ? "border-primary" : "border-transparent"}`} onClick={() => image !== index && setImage(index)} />)}
            </div>
            <div className="flex-1">
                {images.map((target, index) => <img src={`https://lhlpxtxqdlctohptywpi.supabase.co/storage/v1/object/public/products/${id}/${target}`} alt={`Image-${index}`} key={`Image-${index}`} className={`w-full aspect-[1/1] object-cover ${image !== index && "hidden"}`} />)}
            </div>
        </div>
    )
}