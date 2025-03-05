import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator} from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post("/register", register, registerValidator);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", login, loginValidator);

export default router;
