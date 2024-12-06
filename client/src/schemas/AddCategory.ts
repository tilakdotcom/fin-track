import { z } from "zod";

const name = z.string().min(4, {
  message: "categoryId must be at least 4 characters.",
});

const type = z
  .enum(["income", "expense"], {
    message: "Type must be 'income' or 'expense'",
  })
  .nullable();

export const AddCategory = z.object({
  name: name,
  type: type,
});
