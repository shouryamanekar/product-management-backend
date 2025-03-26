require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerDocs = require("./utils/swagger");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
swaggerDocs(app);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
