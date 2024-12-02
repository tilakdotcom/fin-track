import mongoose, { Document, Schema } from "mongoose";

interface ExpenseType extends Document {
  userId: mongoose.ObjectId;
  categoryId: mongoose.ObjectId;
  title: string;
  amount: number;
  description: string;
  color:string;
}

const expenseSchema: Schema<ExpenseType> = new Schema({
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
  title: {
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
  color: {
    type: String,
    default: "#3498db", // Default color for expenses
    required:true,
  },
},{timestamps:true});


const Expense  = mongoose.model<ExpenseType>("Expense", expenseSchema)

export default Expense;