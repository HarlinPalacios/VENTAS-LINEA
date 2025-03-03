import { Router } from "express";
import { getAdminById, getAdmins, deleteAdmin, updatePassword } from "./admin.controller.js";

const router = Router();

//url para buscar estudiantes
router.get("/findAdmin/:uid", getAdminById);

//url para listar estudiantes
router.get("/", getAdmins);

//url para eiliminar estudiantes
router.delete("/deleteAdmin/:uid", deleteAdmin);

//url para actualizar la cantraseña
router.patch("/updatePassword/:uid", updatePassword);

export default router;
