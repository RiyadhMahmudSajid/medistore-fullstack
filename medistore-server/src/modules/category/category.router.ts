import express, { Router } from 'express'
import { categoryController } from "./category.controller"
import authenticationMiddleware, { UserRole } from '../../middleware/authenticationMiddleware'



const router = express.Router()



router.post("/",authenticationMiddleware (UserRole.ADMIN),categoryController.createCategory)
router.get("/",categoryController.getCategory)
router.get("/:categoryId",categoryController.getCategoryById)
router.delete("/:categoryId",authenticationMiddleware(UserRole.ADMIN),categoryController.deleteCategoryById)
export const categoryRouter:Router = router