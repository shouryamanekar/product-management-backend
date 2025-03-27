require("dotenv").config({ path: ".env.test" }); // Load test environment variables
const request = require("supertest");
const app = require("../src/index");
const User = require("../src/models/User");
const mongoose = require("mongoose");

describe("Authentication Endpoints", () => {
  let testUser = {
    name: process.env.AUTH_TEST_USER_NAME,
    email: process.env.AUTH_TEST_USER_EMAIL,
    password: process.env.AUTH_TEST_USER_PASSWORD,
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not register a user with missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: testUser.email,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("All fields are required");
  });

  it("should not register a user with an invalid email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Invalid Email User",
      email: "invalid-email",
      password: "password123",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain("valid email");
  });

  it("should not register a user with an existing email", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("should not login with missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("All fields are required");
  });

  afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
    await mongoose.connection.close();
  });
});