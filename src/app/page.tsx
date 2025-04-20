"use client"

import { Header } from "@/components/pages/home/header/header"
import { LatestCollection } from "@/components/pages/home/latest-collection/latest-collection"
import { useEffect, useState } from "react"

export default function Home() {
    const [mobile, setMobile] = useState<boolean>()

    useEffect(() => {
        if (document) setMobile(window.matchMedia("(width < 48rem)").matches)
    }, [])

    return mobile !== undefined && (
        <div className="w-full space-y-5">
            <Header mobile={mobile} />
            <LatestCollection />
            {/*<Categories />
            <BestSellers />*/}
        </div>
    )
}
