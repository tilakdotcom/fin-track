import { DATA_BASE } from "@/constant";
import mongoose from "mongoose";

//connect to database

const dbConnect = async()=>{
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DATA_BASE}`)
    console.log(`MongoDB Connected, Host: ${connection.connection.host}`);
  } catch (error:any) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}

export default dbConnect;