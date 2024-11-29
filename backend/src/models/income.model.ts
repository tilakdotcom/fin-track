import mongoose,{Document, Schema} from "mongoose";


interface TransactionType extends Document {
  amount: number;
  type: string;
  description: string;
  userId : mongoose.ObjectId; 
}