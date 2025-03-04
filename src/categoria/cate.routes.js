import { Router } from "express"
import { createCate, getCates, deleteCate, updateCate, getCateById } from "./cate.controller.js"
import { createCateValidator, updateCateValidator } from "../middlewares/cate-validators.js"

const router = Router()

router.post("/create", createCateValidator, createCate)

router.get("/", getCates)

router.get("/:uid", getCateById)

router.delete("/:uid", deleteCate)

router.patch("/:uid", updateCateValidator, updateCate)

export default router