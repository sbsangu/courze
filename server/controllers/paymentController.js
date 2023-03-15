import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import {instance} from "../server.js"
import crypto from "crypto"
import { Payment } from "../models/Payment.js";

export const buySubscription=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user._id);
    if(user.role==="admin"){
        return next(new ErrorHandler("Admin Cant Buy Subscription",401))
    }

    //const plan_id=plan id ||or belwo give

    const subscription=instance.subscriptions.create({
        plan_id: "plan_7wAosPWtrkhqZw",
        customer_notify: 1,
       
        total_count: 12,

    })
    user.subscription.id=subscription.id;

    user.subscription.status=subscription.status;

    await user.save();
    res.status(201).json({
        success:true,
        subscriptionId:subscription.id,
    })
})

export const paymentVerification=catchAsyncError(async (req,res,next)=>{

    const {razorpay_signature,razorpay_payment_id,razorpay_subsription_id}=req.body;
    const user=await User.findById(req.user._id);
    const subscription_id=user.subscription_id;


    const generated_signature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(razorpay_payment_id+"|" + subscription_id  ,"utf-8").digest("hex");

    const isAuthentic=generated_signature===razorpay_signature;
    if(!isAuthentic){

        return res.redirect(`${proceess.env.FRONTED_URL}/paymentfail`)
    }
    await Payment.create({
        razorpay_signature,razorpay_payment_id,razorpay_subsription_id

    })
    user.subscription.status="active"

await user.save();
res.redirect(`${proceess.env.FRONTED_URL}/paymentsuccess?reference=${razorpay_payment_id}`)

})


export const getRazorPay=catchAsyncError(async(req,res,next)=>{

    res.status(200).json({
success:true,
key:process.env.RAZORPAY_API_SECRET,

    })
})

export const cancelSubscription=catchAsyncError(async(req,res,next)=>{

    const user=await User.findById(req.user._id)
    const subscriptionId=user.subscription.id;
await instance.subscriptions.cancel(subscriptionId);

const  refund=false;
const payment=await Payment.findById({razorpay_subsription_id:subscriptionId});

const gap=Date.now()-payment.createdAt;

const refundTime=process.env.REFUND_DAYS *1000*60*60*24;

if(refundTime>gap){

    await instance.payments.refund(payment.razorpay_payment_id)
    refund=true;
}

await payment.remove();

subscriptionId=undefined;
user.susbscrpiton.status=undefined
await user.save();



    res.status(200).json({
success:true,
message:refund?"Subscription cancelled,You will recieve full refund within 7 days":"Subscription cancelled,No refund will be given as subscription was cancelled after 7 days"

    })
})