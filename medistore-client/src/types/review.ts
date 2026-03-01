
import { Medicine } from "./medicine.types"

export interface Review {
    id?:string,
    customerId:string,
    rating:number,
    comment:string
    medicineId?:string
    medicine?:Medicine
}