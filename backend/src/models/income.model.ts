import mongoose, { Document, Schema } from "mongoose";

interface IncomeType extends Document {
  userId: mongoose.ObjectId;
  categoryId: mongoose.ObjectId;
  source: string;
  amount: number;
  description: string;
  color: string;
}

const incomeSchema: Schema<IncomeType> = new Schema(
  {
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
    color: {
      type: String,
      default: "#3498db", // Default color for expenses
      required: true,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model<IncomeType>("Income", incomeSchema);

export default Income;
