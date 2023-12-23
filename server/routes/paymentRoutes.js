import express from "express"
import { buySubscription, cancelSubscription, getRazorPay, paymentVerification } from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router=express.Router();




router.route("/subscribe").get(isAuthenticated,buySubscription)

//verify payment

router.route("/paymentverification").post(isAuthenticated,paymentVerification)

router.route("/razorpay").get(getRazorPay)

router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription)




export default router;