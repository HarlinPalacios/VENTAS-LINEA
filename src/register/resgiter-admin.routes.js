import { Router } from "express";
import { register, login } from './register-admin.controller.js';
import { loginValidator } from "../middlewares/admin-validators.js"

const router = Router()

//url para registar estudiantes
router.post("/regiter", register)

//url para iniciar sesion
router.post("/login", login, loginValidator)

export default router