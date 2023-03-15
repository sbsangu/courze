import app from "./app.js"
import cloudinary from "cloudinary"
import Razorpay from "razorpay"
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

import { connectDB } from "./config/database.js"
connectDB();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})


export const  instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
  });

  
nodeCron.schedule("0 0 0 1 * *", async () => {
    try {
      await Stats.create({});
    } catch (error) {
      console.log(error,message);
    }
  });

 
  

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
