import { env } from "@/env";
import { Category } from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL

interface GetCategoryParams {
    search?: string
}

interface ServiceOption {
    cache?: RequestCache,
    revalidate?: number
}
const categoryService = {
    getCategory: async function (params: GetCategoryParams, option?: ServiceOption) {
        try {

            const url = new URL(`${API_URL}/categoryPost`)
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value)
                    }
                })
            }

            const config: RequestInit = {}
            if (option?.cache) {
                config.cache = option.cache
            }
            if (option?.revalidate) {
                config.next = { revalidate: option.revalidate }
            }
          

            const result = await fetch(url.toString(), config)
            const data = await result.json()
            return data

        } catch (err) {
            return { data: null, error: { err } }
        }
    },
    getCategoryById: async function (categoryId: string) {
        try {

            const result = await fetch(`${API_URL}/categoryPost/${categoryId}`)
            const data = await result.json()
            return { data: data, error: null }

        } catch (err) {
            return { data: null, error: { err } }
        }
    },
postCategory: async function (category: Category, cookieHeader?: string) {
       
        try {

            const res = await fetch(`${API_URL}/categoryPost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                    ...(cookieHeader && { Cookie: cookieHeader })
                },
                body: JSON.stringify(category)
            })
            const data = await res.json()
            
            if (data.error) {
                return { data: null, error: { message: "can not post " } }
            }
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "something went wrong" } }
        }
    }

}

export default categoryService