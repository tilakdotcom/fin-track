import { addIncome, getIncomes, removeIncome, updateIncome } from "@/controllers/income.controller";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

//router
const router = Router();

//middlewares
router.use(verifyJWT);

router.route("/add").post(addIncome);

router.route("/").get(getIncomes);

router.route("/:incomeId").put(updateIncome).delete(removeIncome);
export default router;
