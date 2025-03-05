import { Schema, model } from "mongoose"

const cateSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoria es necesaria"],
        maxLength: [25, "No exceder mas de los 25 caracteres"]
    },
    descripcion: {
        type: String,
        required: true,
        maxLength: [150, "No exceder mas de los 150 caracteres"]
    },
    status: {
        type: Boolean,
        default: true
    }
})

cateSchema.methods.toJSON = function() {
    const { _id, ...cate } = this.toObject()
    cate.uid = _id
    return cate
}

export default model("Categoria", cateSchema)
