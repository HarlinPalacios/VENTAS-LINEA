import { Schema, model } from "mongoose";

//Requisitos que se deben cumplir
const adminSchema = Schema({
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
}, {
    versionKey: false,
    timestamps: true
});

adminSchema.methods.toJSON = function() {
    const { _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
};



export default model("Admin", adminSchema);
