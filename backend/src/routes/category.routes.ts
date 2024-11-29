import { addCategory, removeCategory } from "@/controllers/category.controller";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

//router
const router = Router();

//middlewares
router.use(verifyJWT);


router.route("/add").post(addCategory)
router.route("/remove").delete(removeCategory)

export default router;
