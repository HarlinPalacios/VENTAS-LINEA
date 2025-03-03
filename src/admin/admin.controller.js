import { hash, verify } from "argon2"
import Admin from "./admin.model.js"

//Buscar el estudiante por uid
export const getAdminById = async (req, res) => {
    try {
        const { uid } = req.params
        const admin = await Admin.findById(uid)

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin no existe",
                error: "No se ha encontrado un Admin con este ID"
            })
        }

        return res.status(200).json({
            success: true,
            admin
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el Admin",
            error: err.message
        })
    }
}

//Listar los estudiante
export const getAdmins = async (req, res) => {
    try {
        const { limits = 3, from = 0 } = req.query
        const query = { status: true }

        const [total, admins] = await Promise.all([
            Admin.countDocuments(query),
            Admin.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            admins
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los Admins",
            error: err.message
        })
    }
}

// Eliminar estudiante
export const deleteAdmin = async (req, res) => {
    try {
        const { uid } = req.params
        const admin = await Admin.findByIdAndUpdate(uid, { status: false }, { new: true })

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin no encontrado",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Admin Eliminado",
            admin
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el Admin",
            error: err.message
        })
    }
}

// Actualizar la contraseña del estudiante
export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params
        const { newPassword, newRole } = req.body

        const admin = await Admin.findById(uid)

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin no encontrado",
            })
        }

        const matchPassword = await verify(admin.password, newPassword)

        if (matchPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        const updateFields = { password: encryptedPassword }

        if(newRole) {
            updateFields.role = newRole
        }

        await Admin.findByIdAndUpdate(uid, updateFields)

        return res.status(200).json({
            success: true,
            message: "Contraseña y role actualizado"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña y el role",
            error: err.message
        })
    }
}
