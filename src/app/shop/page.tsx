import { Category } from "@/components/pages/home/categories/category"
import { getCategories } from "@/supabase/queries"
import { createClient } from "@/supabase/server"

export default async function Shop() {
    const supabase = await createClient()
    const categories = await getCategories(supabase)

    return (
        <div className="w-full space-y-5">

            {categories.map((value, index) => <Category key={`category-${index}`} category={value} />)}

        </div>
    )
}
