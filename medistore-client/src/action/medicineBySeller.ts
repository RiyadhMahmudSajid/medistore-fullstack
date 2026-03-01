'use server'

import medicineService from "@/components/modules/medicineService";
import orderService from "@/components/modules/orderService";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteMedicineBySeller = async (medicineId: string) => {
    try {

        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const res = await medicineService.deleteMedicineBySeller(medicineId, cookieHeader);
        updateTag("myMedicine")

        return res;
    } catch (error) {
        return { data: null, error: { message: "Internal Server Error" } };
    }
}


export const getSellerOrder = async () => {
    try {
        const cookieStore = await cookies()
        const cookieHeader = cookieStore.toString()
        const res = await orderService.getSellerOrder(cookieHeader);
        return res

    } catch (error) {
        
        return { data: null, error: { message: "Internal Server Error" } };
    }
}

export const updateStatus = async (orderId:string,status:string) => {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();
        const res = await orderService.updateStatus(cookieHeader, orderId , status)
        updateTag("SellerOrder")
        return res

    } catch (error) {
        
        return { data: null, error: { message: "Internal Server Error" } };
    }
}