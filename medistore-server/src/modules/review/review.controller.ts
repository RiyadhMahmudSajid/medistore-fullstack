import { Request, Response } from "express"
import { reviewService } from "./review.service"

const createReview = async (req: Request, res: Response) => {
    try {
        const medicineId = req.params.medicineId as string
        const customerId = req.user?.id as string
        
        const result = await reviewService.createReview(req.body, medicineId, customerId)
        res.status(201).json(result)
    } catch (err) {
        
        res.status(400).json({
            error: "Category creation failed",
            details: err
        })
    }
}

const getReview = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string
        
        const result = await reviewService.getReview(userId)
        res.status(201).json(result)

    } catch (err) {

       
        res.status(400).json({
            error: "Category creation failed",
            details: err
        })

    }
}

const getReviewForSeller = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string
        
        const result = await reviewService.getReviewForSeller(userId)
       
        res.status(201).json(result)

    } catch (err) {

        
        res.status(400).json({
            error: "Category creation failed",
            details: err
        })

    }
}

export const reviewController = {
    createReview, getReview, getReviewForSeller
}