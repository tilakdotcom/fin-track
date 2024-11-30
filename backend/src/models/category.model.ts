import mongoose, { Document, Schema } from "mongoose";

interface CategoryType extends Document {
  userId: mongoose.ObjectId;
  name: string;
  type: string;
}

const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
      required: [true, "name must be provided"],
      trim: true,
      unique: true,
      lowercase: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    default: "expense",
    enum: ["expense", "income"],
  },
});

const Category = mongoose.model<CategoryType>("Category", categorySchema);

export default Category;