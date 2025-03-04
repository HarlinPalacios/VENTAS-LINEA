import { Schema, model } from "mongoose";

//Requisitos que se deben cumplir
const userSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: 50
    },
    surname: {
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: 50
    },
    username: {
        type: String,
        required: [true, "El nombre del usuario es requerido"],
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, 
{
    versionKey: false,
    timestamps: true
});

userSchema.methods.toJSON = function() {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};



export default model("usuario", userSchema);
