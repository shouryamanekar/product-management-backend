require("dotenv").config({ path: ".env.test" }); // Load test environment variables
const request = require("supertest");
const app = require("../src/index");
const Product = require("../src/models/Product");
const User = require("../src/models/User");
const mongoose = require("mongoose");

let token;
let productId;

beforeAll(async () => {
  const user = {
    name: process.env.TEST_USER_NAME,
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
  };

  await request(app).post("/api/auth/register").send(user);
  const res = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });
  token = res.body.token;
});

describe("Product Endpoints", () => {
  it("should create a new product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        price: 100,
        description: "A test product",
        stock: 10,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    productId = res.body._id;
  });

  it("should not create a product with missing fields", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 100,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("Name and price are required");
  });

  it("should fetch all products", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  it("should fetch a product by ID", async () => {
    const res = await request(app)
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", productId);
  });

  it("should return 404 for a non-existent product ID", async () => {
    const res = await request(app)
      .get(`/api/products/605c72ef4f1a2b0012345678`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Product not found");
  });

  it("should update a product", async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Test Product",
        price: 150,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Updated Test Product");
    expect(res.body.price).toBe(150);
  });

  it("should not update a product with invalid fields", async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: -100,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain("Price cannot be negative");
  });

  it("should delete a product", async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Product deleted successfully");
  });

  it("should return 404 when deleting a non-existent product", async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Product not found");
  });
});

afterAll(async () => {
  await Product.deleteOne({ _id: productId });
  await User.deleteOne({ email: process.env.TEST_USER_EMAIL });
  await mongoose.connection.close();
});