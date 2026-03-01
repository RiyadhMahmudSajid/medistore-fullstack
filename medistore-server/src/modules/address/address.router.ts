import express, { Router } from "express"
import { addressController } from "./address.controller"
import authenticationMiddleware, { UserRole } from "../../middleware/authenticationMiddleware"


const router = express.Router()

router.post("/",authenticationMiddleware(UserRole.CUSTOMER), addressController.createAddress)



export const addressRouter:Router = router