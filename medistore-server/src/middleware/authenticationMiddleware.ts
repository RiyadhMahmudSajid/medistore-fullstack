import express, { NextFunction, Request, Response, Router } from "express"
import { auth } from "../lib/auth"

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER"
}


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                name: string,
                role: string,
                emailVerified: boolean
            }
        }
    }
}

const authenticationMiddleware = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers as any
            })
           
            if (!session) {
                return res.status(401).json({
                    success: true,
                    message: "Yor are unauthorized"
                })
            }
            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email Verification required"
                })
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified


            }

            if (roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden ! You Don't have permission"
                })
            }

            next()
        } catch (err) {
            next(err)
        }

    }

}

export default authenticationMiddleware