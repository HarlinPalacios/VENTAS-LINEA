import Producto from "./producto.model.js"
import Categoria from "../categoria/cate.model.js"

export const createProducto = async (req, res) => {
    try{
        const { name, descripcion, precio, marca, stock, categoriaId} = req.body

        //verifica si la categoria existe
        const categoria = await Categoria.findById(categoriaId)

        if(!categoria){
            return res.status(400).json({
                success: false,
                message: "La categoria no existe"
            })
        }

        const producExists = await Producto.findOne({ name: name });
        if (producExists) {
            return res.status(400).json({
                success: false,
                message: "El producto ya existe"
            });
        } 

        const newProducto = new Producto({
            name,
            descripcion,
            precio,
            marca,
            stock,
            categoria: categoriaId
        })

        await newProducto.save()

        return res.status(200).json({
            success: true,
            message: "El producto a sido creado",
            producto: newProducto
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear el Producto",
            error: err.massage
        })
    }
}

//Listar los productos
export const getProducto = async (req, res) => {
    try{
        const produs = await Producto.find()
        const total = produs.length

        const produsWithCategoria = []

        for (const producto of produs) {
            const categoria = await Categoria.findById(producto.categoria)

            produsWithCategoria.push({
                ...producto.toObject(),
                categoria: categoria ? categoria: null
            })
        }

        return res.json({
            total,
            producto: produsWithCategoria
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos",
            error: response.massage
        })
    }
}

//Eliminar Producto
export const deleteProduc = async (req, res) => {
    try{
        const { productoId } = req.params
        const deleteProduc = await Producto.findByIdAndDelete(productoId)

        if(!deleteProduc){
            return res.status(400).json({
                success: false,
                message: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Producto eliminado"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.massage
        })
    }
}

//Listar productos por su categoria
//NO FUNCIONAL
export const getCatePro = async (req, res) => {
    try {
        const { categoriaId } = req.params;

        // Buscar la categoría
        const categoria = await Categoria.findById(categoriaId);

        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        // Buscar productos relacionados con esa categoría
        const productos = await Producto.find({ categoria: categoriaId });

        return res.status(200).json({
            success: true,
            message: "Categoría y productos obtenidos",
            categoria,
            productos
        });

    } catch (err) {
        console.log("categoriaId:", categoriaId);
            return res.status(500).json({
            success: false,
            message: "Error al obtener la categoría y sus productos",
            error: err.message
        });
    }
}


//Actualizar Producto
export const updateProduc = async (req, res) => {
    try{
        const { productoId } = req.params
        const { name, descripcion, precio, marca, stock, categoriaId} = req.body

        const categoria = await Categoria.findById(categoriaId)

        if(!categoria){
            return res.status(400).json({
                success: false,
                message: "Categoria no encontrada",
            })
        }

        const updateProduc = await Producto.findByIdAndUpdate(
            productoId,
            {name, descripcion, precio, marca, stock, categoria: categoriaId},
            {new: true}
        )

        if(!updateProduc){
            return res.status(400).json({
                success: false,
                message: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "El producto a sido actualizado exitosamenete",
            producto: updateProduc
        })

    }catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        })
    }
}