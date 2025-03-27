const Product = require("../models/Product");

// @desc   Create a new product
// @route  POST /api/products
// @access Protected
const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    // Validate input fields
    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const newProduct = new Product({ name, price, description, stock });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all products with search, filter, and pagination
// @route  GET /api/products
// @access Protected
const getProducts = async (req, res) => {
  try {
    let { search, minPrice, maxPrice, page, limit } = req.query;

    const query = {};

    // Search by product name
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination setup
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const total = await Product.countDocuments(query);

    const products = await Product.find(query).skip(skip).limit(pageSize);

    res.json({
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get product by ID
// @route  GET /api/products/:id
// @access Protected
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Protected
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (price !== undefined && price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock;

    await product.save();
    res.json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Protected
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
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