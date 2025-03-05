import Categoria from "./cate.model.js"
import mongoose from "mongoose";

//crear Categoria
export const createCate = async (req, res) => {
    try{
        const { name, descripcion } = req.body

        const existingCategory = await Categoria.findOne({ name: name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "La categoría ya existe"
            });
        } 

        const cate = new Categoria({
            name, 
            descripcion
        })

        await cate.save()

        return res.status(200).json({
            success: true,
            message: "Categoria creada Exitosamente",
            cate
        })

    }catch (err){
        return res.status(500).json({
            success: false,
            message: "Error al crear la categoria",
            error: err.message
        })
    }
}


//Listar las categorias
export const getCates = async (req, res) => {
    try{
        const { limits = 3, from = 0 } = req.query
        const query = { status: true}

        const [ total, cates ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                    .skip(Number(from))
                    .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            message: "Lista de categorias exitosa",
            total,
            cates
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar las categorias",
            error: err.massage
        })
    }
}

//Buscar una categoria
export const getCateById = async (req, res) => {
    try{
        const { uid } = req.params
        const categoria = await Categoria.findById(uid)

        if(!categoria){
            return res.status(400).json({
                success: false,
                messaje: "La categoria no existe",
                error: err.messaje
            })
        }

        return res.status(200).json({
            success: true,
            categoria
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la categoria",
            error: err.message
        })
    }
}

//Eliminar categoria 
export const deleteCate = async (req, res) => {
    try{
        const cateId = req.params.cateId

        if (!mongoose.Types.ObjectId.isValid(cateId)) {
            return res.status(400).json({
                success: false,
                message: "El ID de la categoría no es válido"
            });
        }

        const cate = await Categoria.findById(cateId)

        if(!cate) {
            return res.status(400).json({
                success: false,
                message: "La categoria no existe"
            })
        }

        const productos = await Producto.find({ Categoria: cateId})

        if (productos.length > 0) {
            const defaultCate = await Categoria.findOne({ name: 'cate-predeterminada' });

            if (!defaultCate) {
                return res.status(400).json({
                    message: "Categoría predeterminada no encontrada"
                });
            }

            await Producto.updateMany(
                { categoria: cateId },
                { $set: { categoria: defaultCate._id}}
            ) 
        }

        await cate.remove()

        return res.status(200).json({
            message: "Categoria eliminada correectamente"
        })

    }catch(err){
        return res.status(500).json({
            message: "Error al eliminar la Categoria", 
            error: err.massage
        })
    }
}

//Actualizar categoria 
export const updateCate = async (req, res) => {
    const { id } = req.params
    const { cateName, cateDescription } = req.body

    try{
        const cate = await Categoria.findById(id)

    if(!cate) {
        return res.status(404).json({
            message: " Categoria no encontrada"
        })
    }

    cate.cateName = cateName || cateName.cateName
    cate.cateDescription = cateDescription || cate.cateDescription

    await cate.save()

    return res.status(200).json ({
        message: "Categoria actualizada", cate
    })
    
    }catch(error) {
        console.error(error)
        return res.status(500).json({
            message: "Error al actualizar la categoria",
            error: err.mesage
        })
    }
}