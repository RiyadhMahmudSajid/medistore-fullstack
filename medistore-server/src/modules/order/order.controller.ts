import { NextFunction, Request, Response } from "express"
import { orderService } from "./order.service"

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (req.user?.id && req.user.role !== "CUSTOMER" as string) {

            return res.status(400).json({ message: `this is  ${req.user.role}` })
        }
        const result = await orderService.createOrder(req.body, req.user?.id as string)
        res.status(201).json(result)
    } catch (err) {
        
        next(err)
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    try {

        const orderId = req.params.orderId as string
        const { status } = req.body
        const result = await orderService.updateOrderStatus(orderId, status)
       
        res.status(201).json(result)

    } catch (err) {
        
    }
}
const paymentSuccess = async (req: Request, res: Response) => {
    try {
        await orderService.handleSuccess(req.params.orderId as string);

        res.redirect(`${process.env.BETTER_APP_URL}`);
    } catch (error: any) {
        res.redirect(`${process.env.BETTER_APP_URL}`);
    }
};

const paymentFail = async (req: Request, res: Response) => {
    try {
        await orderService.handleFail(req.params.orderId as string);

        res.redirect(`${process.env.BETTER_APP_URL}`);
    } catch (error: any) {
        res.redirect(`${process.env.BETTER_APP_URL}`);
    }
};

const paymentCancel = async (req: Request, res: Response) => {
    try {
        await orderService.handleCancel(req.params.orderId as string);

        res.redirect(`${process.env.BETTER_APP_URL}`);
    } catch (error: any) {
        res.redirect(`${process.env.BETTER_APP_URL}`);
    }
};

const getMyOrder = async (req: Request, res: Response) => {
    try {
        if (req.user?.id && req.user.role !== "CUSTOMER" as string) {

            return res.status(400).json({ message: `this is  ${req.user.role}` })
        }
        const result = await orderService.getMyOrder(req.user?.id as string)
        res.status(201).json(result)

    } catch (err) {
        
        res.status(400).json({
            error: "Can Not find Medicine",

            details: err

        })
        
    }
};
const getMyMedicineOrder = async (req: Request, res: Response) => {
    try {
        if (req.user?.id && req.user.role !== "SELLER" as string) {

            return res.status(400).json({ message: `this is  ${req.user.role}` })
        }
        const result = await orderService.getMyMedicineOrder(req.user?.id as string)
        res.status(201).json(result)

    } catch (err) {
        
        res.status(400).json({
            error: "Can Not find your medicine that already order",

            details: err

        })
        
    }
}


export const orderController = {
    createOrder, updateOrderStatus, paymentSuccess,
    paymentFail,
    paymentCancel, getMyOrder, getMyMedicineOrder
}