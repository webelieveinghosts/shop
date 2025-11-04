import { createClient } from "../client"

export const getAllVideos = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("videos").select("*")

    if (error) {
        console.error("Erro ao buscar vídeos:", error)
        return []
    }

    console.log(data)
    
    return data


}
