"use client"

import { useState } from "react"
import { Logo } from "../logo/logo"
import { FaInstagram } from "react-icons/fa"
import { addNewsletterEmail } from "@/supabase/newsletter/client"

export const Footer = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        if (!email.trim()) return setMessage("Digite um email válido.")

        setLoading(true)
        const res = await addNewsletterEmail(email)
        setLoading(false)

        if (res.ok) {
            setMessage("✅ Email cadastrado com sucesso!")
            setEmail("")
        } else {
            // Mostra mensagem amigável + loga motivo no console
            console.error("Newsletter insert error:", res.error)
            // Se for erro de RLS/permissão ou constraint, mostra mais amigável
            const errMsg = res.error?.message ?? "Ocorreu um erro, tente novamente."
            setMessage(`❌ ${errMsg}`)
        }
    }

    return (
        <footer className="bg-white text-black min-w-full border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
                <div className="md:flex md:justify-between md:items-start gap-8">
                    {/* ... logo / social (mesmo de antes) ... */}

                    <div className="flex flex-col">
                        <h2 className="mb-3 text-sm font-semibold uppercase">Newsletter</h2>
                        <p className="mb-3 text-gray-500 text-sm">Receba novidades e promoções direto no seu email.</p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Seu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="p-2 rounded-2xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-black focus:outline-none flex-1"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                {loading ? "Enviando..." : "Assinar"}
                            </button>
                        </form>

                        {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
                    </div>
                </div>
            </div>
        </footer>
    )
}
