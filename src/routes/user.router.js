import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"


const router = Router()

router.route("/register").post(registerUser)
// /api/v1/users/register

// router.route("/login").post(login)
// /api/v1/users/login


export default router

