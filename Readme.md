# Product Management Backend

This is the backend for the Product Management application. It provides RESTful APIs for user authentication, product management, and other related functionalities.

---

## Features

- User authentication (register, login)
- Product management (CRUD operations)
- Search, filter, and pagination for products
- JWT-based authentication
- Swagger API documentation
- Secure with Helmet, CORS, and rate limiting
- MongoDB database integration

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/product-management-backend.git
   cd product-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```
   PORT=5000
   MONGO_URI=<yourongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   API_BASE_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will run at `http://localhost:5000`.

---

## API Documentation

The API documentation is available in Swagger format. After starting the server, you can access it at:

**[Swagger Docs](http://localhost:5000/api-docs)**

For detailed API information, refer to the [ApiDocumentation.md](./ApiDocumentation.md) file.

---

## Project Structure

```
product-management-backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # API controllers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions (e.g., Swagger setup)
│   └── index.js         # Entry point of the application
├── .env                 # Environment variables
├── .gitignore           # Ignored files for Git
├── package.json         # Project dependencies and scripts
├── Readme.md            # Project documentation
└── ApiDocumentation.md  # Detailed API documentation
```

---

## Available Scripts

- **Start the server:**
  ```bash
  npm start
  ```

- **Start the server in development mode:**
  ```bash
  npm run dev
  ```

---

## Dependencies

- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token for authentication
- **Helmet**: Security headers
- **CORS**: Cross-Origin Resource Sharing
- **Swagger**: API documentation
- **Bcrypt.js**: Password hashing

---

### Testing
Currently, no tests are implemented. You can add tests using a framework like Jest or Mocha.