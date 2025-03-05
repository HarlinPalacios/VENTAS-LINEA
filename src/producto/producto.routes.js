import {Router} from "express";
import { createProducto, getProducto, getCatePro, deleteProduc, updateProduc, getProducAgo, getProducVendi} from "./producto.controller.js";
import { createProductoValidator, deleteProducValidator, updateProducValidator } from "../middlewares/produc-validators.js";

const router = Router();

/**
 * @swagger
 * /productos/createPro:
 *   post:
 *     summary: Crear un nuevo producto
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/createPro", createProductoValidator, createProducto);

/**
 * @swagger
 * /productos/listar:
 *   get:
 *     summary: Listar todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/listar", getProducto);

/**
 * @swagger
 * /productos/listarCate/{categoriaId}:
 *   get:
 *     summary: Listar productos por categoría
 *     parameters:
 *       - in: path
 *         name: categoriaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos por categoría
 */
router.get("/listarCate/:categoriaId", getCatePro);

/**
 * @swagger
 * /productos/delete/{productoId}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     parameters:
 *       - in: path
 *         name: productoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/delete/:productoId", deleteProducValidator, deleteProduc);

/**
 * @swagger
 * /productos/actuluizar/{productoId}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     parameters:
 *       - in: path
 *         name: productoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/actuluizar/:productoId", updateProducValidator, updateProduc);

/**
 * @swagger
 * /productos/agotado:
 *   get:
 *     summary: Listar productos agotados
 *     responses:
 *       200:
 *         description: Lista de productos agotados
 */
router.get("/agotado", getProducAgo);

/**
 * @swagger
 * /productos/vendido:
 *   get:
 *     summary: Listar productos vendidos
 *     responses:
 *       200:
 *         description: Lista de productos vendidos
 */
router.get("/vendido", getProducVendi);

export default router;
