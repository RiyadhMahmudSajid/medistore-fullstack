import { env } from "@/env";
import { Medicine } from "@/types";




const API_URL = env.NEXT_PUBLIC_API_URL

interface ServiceOption {
    cache?: RequestCache,
    revalidate?: number
}

interface GetmedicineParams {
    search?: string
    page?:string
}
const medicineService = {
    getAllMedicine: async function (params?: GetmedicineParams, option?: ServiceOption) {
        try {

            const url = new URL(`${API_URL}/medicine`)

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
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
            const res = await fetch(url.toString(), config);


            if (!res.ok) return { data: null, error: { message: "Failed to fetch medicine" } };

            const data = await res.json();


            return { data: data, error: null };

        } catch (err) {
            
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    getMedicineById: async function (MedicineId: string) {
        try {

            const res = await fetch(`${API_URL}/medicine/${MedicineId}`)
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { err } }
        }
    },


    getMedicineBySellerId: async function (cookieHeader?: string) {
        try {
            const res = await fetch(`${API_URL}/medicine/once`, {
                headers: {
                    "Content-Type": "application/json",

                    ...(cookieHeader && { Cookie: cookieHeader })
                },
                next: {
                    tags: ['myMedicine'],
                },
            });

            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { err } };
        }
    },


    postMedicine: async function (medicine: Medicine, cookieHeader?: string) {
       
        try {

            const res = await fetch(`${API_URL}/medicine`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                    ...(cookieHeader && { Cookie: cookieHeader })
                },
                body: JSON.stringify(medicine)
            })
            const data = await res.json()
           
            if (data.error) {
               
                return { data: null, error: { message: "can not post " } }
            }
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "something went wrong" } }
        }
    },

    deleteMedicineBySeller: async function (MedicineId: string, cookieHeader?: string) {
        try {

            const res = await fetch(`${API_URL}/medicine/${MedicineId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...(cookieHeader && { Cookie: cookieHeader })
                }
            })
            const data = await res.json();
            return { data: data, error: null };

        } catch (err) {
            return { data: null, error: { message: "something went wrong" } }
        }
    }



};



export default medicineService;