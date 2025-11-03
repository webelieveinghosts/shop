"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/ui/navbar/navbar"
import { Footer } from "@/components/ui/footer/footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const noLayout = ["/"] // rotas que NÃO mostram navbar/footer

    if (noLayout.includes(pathname)) return <>{children}</>

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
