import {Router} from "express"
import { createProducto, getProducto, getCatePro, deleteProduc, updateProduc, getProducAgo, getProducVendi} from "./producto.controller.js"
import { createProductoValidator, deleteProducValidator, updateProducValidator } from "../middlewares/produc-validators.js"

const router = Router()

router.post("/createPro", createProductoValidator, createProducto)

router.get("/listar", getProducto)

router.get("/listarCate/:categoriaId", getCatePro)

router.delete("/delete/:productoId", deleteProducValidator, deleteProduc)

router.put("/actuluizar/:productoId", updateProducValidator, updateProduc)

router.get("/agotado", getProducAgo)

router.get("/vendido", getProducVendi)

export default router