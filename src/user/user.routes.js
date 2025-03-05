import { Router } from "express";
import { getUsers, getUserById, deleteUser, updatePassword, updateUser} from "./user.controller.js"
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js"

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:uid", getUserById, getUserByIdValidator);

/**
 * @swagger
 * /users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:uid", deleteUser, deleteUserValidator);

/**
 * @swagger
 * /users/{uid}:
 *   patch:
 *     summary: Actualizar la contraseña de un usuario
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       404:
 *         description: Usuario no encontrado
 */
router.patch("/:uid", updatePassword, updatePasswordValidator);

/**
 * @swagger
 * /users/{uid}:
 *   put:
 *     summary: Actualizar un usuario
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:uid", updateUser, updateUserValidator);

export default router;