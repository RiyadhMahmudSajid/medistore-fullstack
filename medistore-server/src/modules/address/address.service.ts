import { prisma } from "../../lib/prisma"

// interface addressInfo {
//     fullName: String
//     phone: String
//     city: String
//     area: String
// }

const createAddress = async (userId: string, payload:any) => {
    const result = await prisma.address.create({
        data:{
            userId,
            ...payload
        }
    })
    return result
}
export const addressService = {
    createAddress
}