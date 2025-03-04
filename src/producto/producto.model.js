import { Schema, model } from "mongoose"

const productoSchema = Schema ({
    name: {
        type: String,
        required: [true, "El nombre del producto es necesario"],
        maxLength: [25, "No exceder mas de los 25 caracteres"]
    },
    descripcion: {
        type: String,
        maxLength: [100, "No exceder mas de los 100 caracteres"]
    },
    precio: {
        type: Number,
        required: true
    },
    marcar: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    }
})

productoSchema.methods.toJSON = function() {
    const { _id, ...producto } = this.toObject()
    producto.uid = _id
    return producto
}

export default model ("Producto", productoSchema)