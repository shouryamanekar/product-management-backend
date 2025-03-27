# API Documentation

This document provides detailed information about the Product Management API, including endpoints, request parameters, and response examples.

---

## Authentication Endpoints

### Register a New User

**POST** `/api/auth/register`

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses
- **201 Created**
  ```json
  {
    "_id": "642c1b2f4f1a2b0012345678",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **400 Bad Request**
  ```json
  {
    "message": "User already exists"
  }
  ```

---

### Login User

**POST** `/api/auth/login`

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "_id": "642c1b2f4f1a2b0012345678",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

---

## Product Endpoints

### Create a New Product

**POST** `/api/products`

#### Request Headers
```json
{
  "Authorization": "Bearer <your-token>"
}
```

#### Request Body
```json
{
  "name": "Product A",
  "price": 100,
  "description": "A sample product",
  "stock": 50
}
```

#### Responses
- **201 Created**
  ```json
  {
    "_id": "642c1b2f4f1a2b0012345678",
    "name": "Product A",
    "price": 100,
    "description": "A sample product",
    "stock": 50,
    "createdAt": "2025-03-27T10:00:00.000Z",
    "updatedAt": "2025-03-27T10:00:00.000Z"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "message": "Name and price are required"
  }
  ```

---

### Get All Products

**GET** `/api/products`

#### Request Headers
```json
{
  "Authorization": "Bearer <your-token>"
}
```

#### Query Parameters
- `search` (optional): Search by product name (case insensitive)
- `minPrice` (optional): Filter by minimum price
- `maxPrice` (optional): Filter by maximum price
- `page` (optional): Page number for pagination
- `limit` (optional): Number of products per page

#### Responses
- **200 OK**
  ```json
  {
    "total": 100,
    "page": 1,
    "pages": 10,
    "products": [
      {
        "_id": "642c1b2f4f1a2b0012345678",
        "name": "Product A",
        "price": 100,
        "description": "A sample product",
        "stock": 50
      },
      {
        "_id": "642c1b2f4f1a2b0012345679",
        "name": "Product B",
        "price": 200,
        "description": "Another product",
        "stock": 30
      }
    ]
  }
  ```

---

### Get Product by ID

**GET** `/api/products/{id}`

#### Request Headers
```json
{
  "Authorization": "Bearer <your-token>"
}
```

#### Path Parameters
- `id`: The ID of the product to retrieve

#### Responses
- **200 OK**
  ```json
  {
    "_id": "642c1b2f4f1a2b0012345678",
    "name": "Product A",
    "price": 100,
    "description": "A sample product",
    "stock": 50
  }
  ```
- **404 Not Found**
  ```json
  {
    "message": "Product not found"
  }
  ```

---

### Update a Product

**PUT** `/api/products/{id}`

#### Request Headers
```json
{
  "Authorization": "Bearer <your-token>"
}
```

#### Path Parameters
- `id`: The ID of the product to update

#### Request Body
```json
{
  "name": "Updated Product A",
  "price": 120,
  "description": "Updated description",
  "stock": 60
}
```

#### Responses
- **200 OK**
  ```json
  {
    "_id": "642c1b2f4f1a2b0012345678",
    "name": "Updated Product A",
    "price": 120,
    "description": "Updated description",
    "stock": 60,
    "createdAt": "2025-03-27T10:00:00.000Z",
    "updatedAt": "2025-03-27T11:00:00.000Z"
  }
  ```
- **404 Not Found**
  ```json
  {
    "message": "Product not found"
  }
  ```

---

### Delete a Product

**DELETE** `/api/products/{id}`

#### Request Headers
```json
{
  "Authorization": "Bearer <your-token>"
}
```

#### Path Parameters
- `id`: The ID of the product to delete

#### Responses
- **200 OK**
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
- **404 Not Found**
  ```json
  {
    "message": "Product not found"
  }
  ```
