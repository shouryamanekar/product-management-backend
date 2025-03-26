const express = require("express");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *       example:
 *         id: 1
 *         name: Sample Product
 *         price: 100
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product management API
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/", protect,createProduct);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was updated
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id",protect, updateProduct);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
router.delete("/:id",protect, deleteProduct);

module.exports = router;
