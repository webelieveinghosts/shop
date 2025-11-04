import { createClient } from "../client"

export const addNewsletterEmail = async (email: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("newsletter").insert({ email })

    if (error) {
        console.error("Erro ao adicionar email:", error)
        return null
    }

    return data
}
