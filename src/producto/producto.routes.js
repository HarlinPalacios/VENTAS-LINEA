import {Router} from "express"
import { createProducto, getProducto, getCatePro, deleteProduc, updateProduc } from "./producto.controller.js"

const router = Router()

router.post("/createPro", createProducto)

router.get("/listar", getProducto)

router.get("listarCate", getCatePro)

router.delete("/delete", deleteProduc)

router.put("/actuluizar", updateProduc)

export default router