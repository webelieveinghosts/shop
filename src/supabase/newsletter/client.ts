// src/supabase/newsletter/client.ts
import { createClient } from "../client"

export const addNewsletterEmail = async (email: string) => {
    const supabase = createClient()

    // insert espera um array de objetos
    const { data, error } = await supabase
        .from("newsletter")
        .insert([{ email }])

    if (error) {
        console.error("Erro ao adicionar email (newsletter):", error)
        return { ok: false, error }
    }

    return { ok: true, data }
}
