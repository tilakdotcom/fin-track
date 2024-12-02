import { z } from "zod";

const categoryId = z.string().min(6, {
  message: "categoryId must be at least 6 characters.",
});
const source = z.string().min(6, {
  message: "categoryId must be at least 6 characters.",
});
const amount = z
  .number()
  .positive({ message: "Value must be positive" })
  .int({ message: "Value must be an integer" })
  .or(z.string())
  .pipe(
    z.coerce
      .number()
      .positive({ message: "Value must be positive" })
      .int({ message: "Value must be an integer" })
  )

  const type = z.enum(["income", "expense"] ,  { message: "Type must be 'income' or 'expense'" }).nullable(); 

export const AddIncomeAndExpeneSchema = z.object({
  categoryId: categoryId,
  source: source,
  amount: amount,
  type : type
});
