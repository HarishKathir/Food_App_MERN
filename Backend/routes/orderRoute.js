import express from "express";
import authMiddleware from '../middlewares/auth.js'
import {placeOrder,verifyOrder,userOrder} from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrder",authMiddleware,userOrder);

export default orderRouter;