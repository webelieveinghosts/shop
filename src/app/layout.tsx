import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"

import { Navbar } from "@/components/ui/navbar/navbar"
import { Footer } from "@/components/ui/footer/footer"
import { CartProvider } from "@/components/provider/cart-provider"
import { PasswordGate } from "@/components/auth/password-gate"
import { getCart } from "@/supabase/queries"
import { createClient } from "@/supabase/server"

import "@/styles/global.css"

export const metadata: Metadata = {
    title: "WBG",
    description: "we believe in ghosts",
}

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient()
    const cartId = await cookies().then(cookies => cookies.get("cartId")?.value)
    const cart = await getCart(supabase, cartId)

    return (
        <html lang="en">
            <body className={`w-full h-screen ${inter.className} antialiased`}>
                <PasswordGate>
                    <CartProvider data={cart}>
                        <Navbar />
                        {children}
                    </CartProvider>

                    <Footer />
                </PasswordGate>
            </body>
        </html>
    )
}
