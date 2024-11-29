import { login, signup } from "@/controllers/user.controller";
import { upload } from "@/middlewares/multer.middleware";
import { Router } from "express";



//router
const router = Router();

// routes
router.route("/signup").post(
  upload.single(
    "avatar"
  ),
  signup
)

router.route("/login").post(login)



export default router