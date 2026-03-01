import { Request, Response } from "express"
import { addressService } from "./address.service"

const createAddress = async (req: Request, res: Response) => {
    try {

        const userId = req.user?.id as string
        const result = await addressService.createAddress(userId, req.body)
        res.status(201).json(result)

    } catch (err) {
         
        res.status(400).json({
           
            error: "Can  crete address",

            details: err

        })
        

    }
}

export const addressController = {
    createAddress
}