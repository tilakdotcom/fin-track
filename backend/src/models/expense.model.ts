import mongoose, { Document, Schema } from "mongoose";

interface ExpenseType extends Document {
  userId: mongoose.ObjectId;
  categoryId: mongoose.ObjectId;
  title: string;
  amount: number;
  description: string;
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
},{timestamps:true});


const Expense  = mongoose.model<ExpenseType>("Expense", expenseSchema)

export default Expense;