import { register } from "@/controllers/user.controller";
import { Router } from "express";



//router
const router = Router();

//middlewares

// routes
router.route("/").get(register)


export default router