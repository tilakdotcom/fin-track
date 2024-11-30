import { addCategory, getAllCategories, removeCategory } from "@/controllers/category.controller";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

//router
const router = Router();

//middlewares
router.use(verifyJWT);


router.route("/").get(getAllCategories)
router.route("/add").post(addCategory)
router.route("/:categoryId").delete(removeCategory)

export default router;
