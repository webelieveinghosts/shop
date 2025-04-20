import { Database } from "@/supabase/database"

export const parse = (size: Database["public"]["Enums"]["size"]) => {
    switch (size) {
        case "small":
            return "P"
        case "medium":
            return "M"
        case "large":
            return "G"
        case "extra_large":
            return "GG"
    }
}