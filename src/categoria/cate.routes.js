import { Router } from "express"
import { createCate, getCates, deleteCate, updateCate } from "./cate.controller.js"
import { createCateValidator, updateCateValidator } from "../middlewares/cate-validators.js"

const router = Router()

router.post("/create", createCateValidator, createCate)

router.get("/", getCates)

router.delete("/:categoriaId", deleteCate)

router.patch("/:id", updateCateValidator, updateCate)

export default router
