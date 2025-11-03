import { Category } from "@/components/pages/home/categories/category"
import { LatestCollection } from "@/components/pages/home/latest-collection/latest-collection"
import { getCategories } from "@/supabase/queries"
import { createClient } from "@/supabase/server"

export default async function Home() {
    const supabase = await createClient()
    const categories = await getCategories(supabase)

    return (
        <div className="w-full space-y-5">

        </div>
    )
}

// {/* <LatestCollection /> */}
// <h1>teste</h1>
// {/* {categories.map((value, index) => <Category key={`category-${index}`} category={value} />)} */}
// {/*<Categories />
// <BestSellers />*/}