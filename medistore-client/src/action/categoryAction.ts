'use server'
import categoryService from "@/components/modules/categoryService";
import { Category} from "@/types"
import { cookies } from "next/headers";

export const createCategoryPost = async (category: Category) => {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const res = await categoryService.postCategory(category, cookieHeader);

        
        return res;
    } catch (error) {
        return { data: null, error: { message: "Internal Server Error" } };
    }
}