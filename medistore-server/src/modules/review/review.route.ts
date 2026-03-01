import express, { Router } from 'express'
import { reviewController } from './review.controller'
import authenticationMiddleware, { UserRole } from '../../middleware/authenticationMiddleware'

const router = express.Router()

router.post("/:medicineId",authenticationMiddleware(UserRole.CUSTOMER), reviewController.createReview)
router.get("/",authenticationMiddleware(UserRole.ADMIN),reviewController.getReview)
router.get("/sellerReview",authenticationMiddleware(UserRole.SELLER),reviewController.getReviewForSeller)

export const reviewRouter:Router = router