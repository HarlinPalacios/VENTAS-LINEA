import { hash, verify } from "argon2"
import User from "../user/user.model.js"

export const createAdmin = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN_ROLE" });

        if (!admin) {
            const hashedPassword = await hash("khszg&rsjUFUKE3466$sin");

            const admin = new User({
                name: "Harlin",
                surname: "Palacios",
                username: "hpalacios113",
                email: "hpalacios@gmail.com",
                password: hashedPassword,
                phone: "21326554",
                role: "ADMIN_ROLE",
            });

            await admin.save();
            console.log("ADMIN_ROLE creado correctamente");
        }else {
            console.log("Admin ya registrado en la base")
        }
    } catch (error) {
        console.error("Error al inicializar el usuario ADMIN_ROLE:", error);
    }
}

//Buscar por id
export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params
        const user = await User.findById(uid)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User no existe",
                error: "No se ha encontrado un User con este ID"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el Admin",
            error: err.message
        })
    }
}

//Listar 
export const getUsers = async (req, res) => {
    try {
        const { limits = 3, from = 0 } = req.query
        const query = { status: true }

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los Admins",
            error: err.message
        })
    }
}

// Eliminar 
export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params
        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User no encontrado",
            })
        }

        return res.status(200).json({
            success: true,
            message: "User Eliminado",
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el Admin",
            error: err.message
        })
    }
}

// Actualizar la contraseña 
export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params
        const { newPassword, newRole } = req.body

        const admin = await User.findById(uid)

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

        await User.findByIdAndUpdate(uid, updateFields)

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

//Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar usuario',
            error: err.message
        });
    }
}
