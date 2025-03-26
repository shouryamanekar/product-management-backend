const Product = require("../models/Product");

// @desc   Create a new product
// @route  POST /api/products
// @access Public
const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const newProduct = new Product({ name, price, description, stock });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all products
// @route  GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get product by ID
// @route  GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Public
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Public
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
