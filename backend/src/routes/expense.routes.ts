import {
  addExpense,
  getAllExpenses,
  removeExpense,
  updateExpense,
} from "@/controllers/expense.controller";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

//router
const router = Router();

//middlewares
router.use(verifyJWT);

router.route("/add").post(addExpense);

router.route("/").get(getAllExpenses);

router.route("/:expenseId").put(updateExpense).delete(removeExpense);
export default router;
