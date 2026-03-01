'use server'

import { reviewService } from "@/components/modules/reviewService";
import { Review } from "@/types";
import { cookies } from "next/headers";

export const  createReview = async function (review:Review,medicineId:string) {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const res = await reviewService.createReview(cookieHeader,review,medicineId);
        
        
        return res;
    } catch (error) {
        return { data: null, error: { message: "Internal Server Error" } };
    }
}


export const getReview = async function () {
      try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const res = await reviewService.getReview(cookieHeader);
        
        
        return res;
    } catch (error) {
        return { data: null, error: { message: "Internal Server Error" } };
    }
}
export const getSellerReview  = async function () {
      try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const res = await reviewService.getSellerReview(cookieHeader);
        
        
        return res;
    } catch (error) {
        return { data: null, error: { message: "Internal Server Error" } };
    }
}

