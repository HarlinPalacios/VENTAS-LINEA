import Admin  from "../user/user.model.js"

export const existeEmail = async(email = '') => {
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previoamente`)
    }
}

export const userExists = async(uid = '') => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error(`El administrador no existe`)
    }
}

export const cateExists = async(uid = '') => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error(`El user no existe`)
    }
}