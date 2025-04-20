import { createClient } from "../server"

export const getProduct = async (id: number) => {
    const supabase = await createClient()
    const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle()
    return data
}