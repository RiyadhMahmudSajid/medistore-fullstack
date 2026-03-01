'use server'
import medicineService from "@/components/modules/medicineService"
import { Medicine } from "@/types"
import { cookies } from "next/headers";

export const createMedicinePost = async (medicine: Medicine) => {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const res = await medicineService.postMedicine(medicine, cookieHeader);

        
        return res;
    } catch (error) {
        return { data: null, error: { message: "Internal Server Error" } };
    }
}