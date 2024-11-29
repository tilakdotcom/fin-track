import { login, logout, signup } from "@/controllers/user.controller";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { upload } from "@/middlewares/multer.middleware";
import { Router } from "express";

//router
const router = Router();

// routes
router.route("/signup").post(upload.single("avatar"), signup);

router.route("/login").post(login);

//middlewares
router.use(verifyJWT);

router.route("/logout").post(logout);

export default router;
