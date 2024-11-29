import mongoose, { Document, Schema } from "mongoose";

interface IncomeType extends Document {
  userId: mongoose.ObjectId;
  categoryId: mongoose.ObjectId;
  source: string;
  amount: number;
  description: string;
}

const incomeSchema: Schema<IncomeType> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
},{timestamps:true});


const Income  = mongoose.model<IncomeType>("Income", incomeSchema)

export default Income;