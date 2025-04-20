"use client"

import { BestSellers } from "@/components/pages/home/best-sellers/best-sellers"
import { Header } from "@/components/pages/home/header/header"
import { LatestCollection } from "@/components/pages/home/latest-collection/latest-collection"
import { useEffect, useState } from "react"

export default function Home() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (document) setLoaded(true)
    }, [])

    return loaded && (
        <div className="w-full space-y-5">
            <Header />
            <LatestCollection />
            {/*<Categories />
            <BestSellers />*/}
        </div>
    )
}
