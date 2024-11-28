import { signup } from "@/controllers/user.controller";
import { upload } from "@/middlewares/multer.middleware";
import { Router } from "express";



//router
const router = Router();

//middlewares

// routes
router.route("/signup").post(
  upload.single(
    // middleware NAMES
    "avatar"
  ),
  signup
)


export default router