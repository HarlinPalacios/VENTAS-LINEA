import { Router } from "express";
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator} from "../middlewares/user-validators.js"

const router = Router();

router.post("/register", register, registerValidator)

router.post("/login", login, loginValidator)

export default router;
