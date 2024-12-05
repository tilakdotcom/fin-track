import { z } from "zod";

const title = z.string().min(6, {
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

export const EditSchema = z.object({
  title: title,
  amount: amount,
});
