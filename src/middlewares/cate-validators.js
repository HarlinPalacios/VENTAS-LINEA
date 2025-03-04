import { body } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const createCateValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("descripcion").notEmpty().withMessage("La descripcion es requerida"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const updateCateValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    
    validarCampos,
    deleteFileOnError,
    handleErrors
]