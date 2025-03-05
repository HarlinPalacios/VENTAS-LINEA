import { Router } from "express";
import { createCate, getCates, deleteCate, updateCate } from "./cate.controller.js";
import { createCateValidator, updateCateValidator } from "../middlewares/cate-validators.js";

const router = Router();

/**
 * @swagger
 * /categorias/create:
 *   post:
 *     summary: Crear una nueva categoría
 *     responses:
 *       201:
 *         description: Categoría creada
 */
router.post("/create", createCateValidator, createCate);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Listar todas las categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get("/", getCates);

/**
 * @swagger
 * /categorias/{categoriaId}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     parameters:
 *       - in: path
 *         name: categoriaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:categoriaId", deleteCate);

/**
 * @swagger
 * /categorias/{id}:
 *   patch:
 *     summary: Actualizar una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 */
router.patch("/:id", updateCateValidator, updateCate);

export default router;
