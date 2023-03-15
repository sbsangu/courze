import mongoose from "mongoose"
export const connectDB=async()=>{

    try {
        mongoose.set("strictQuery", false);
        const { connection } = await mongoose.connect(process.env.MONGO_URI)
        console.log("perfectly running")
      } catch (error) {
        console.log(error);
      }
    }

    