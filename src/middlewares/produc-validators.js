import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const createProductoValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteProducValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const updateProducValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    
    validarCampos,
    deleteFileOnError,
    handleErrors
]