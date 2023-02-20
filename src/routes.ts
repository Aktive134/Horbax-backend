import { Router, Request, Response } from "express";
import productRouter from "./features/product/product.routes";
import authRouter from "./features/auth/auth.routes";
import orderRouter from "./features/order/order.routes";
import validateToken from "./middleware/validate-token";
import userRouter from "./features/user/user.routes";

const router = Router() 

router.get("/", (
    req: Request, 
    res : Response
) => {
    res.status(200).json({
        message: "Service Running Ok", 
        status: true, 
        statusCode: 200, 
        data : []
    })
});

router.use(authRouter);
router.use(productRouter);
router.use(validateToken);
router.use(userRouter);
router.use(orderRouter);

export default router