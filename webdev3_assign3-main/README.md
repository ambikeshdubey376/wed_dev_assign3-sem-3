# Inventory and Data Management System (Lab Assignment 3)

### Student Information
- **Name:** Ambikesh yash dubey
- **Roll No.:** 2501010002
- **Course:** B.Tech CSE Core (Web Dev III)
- **Section:** A
- **Unit:** Unit 3 | **Marks:** 2.5

---

##  Project Overview

This project is a RESTful backend application built for an **Inventory and Data Management System**. Developed with **Node.js**, **Express.js**, and **MongoDB (via Mongoose)**, the service provides complete catalog management, real-time stock modifications, conditional filtering, sorting, pagination, and data analytics using MongoDB aggregation pipelines.

---

##  Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Object Data Modeling (ODM):** Mongoose
- **Environment Management:** dotenv

---

##  Installation & Running the Server

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Ensure a `.env` file exists in the root directory:
   ```env
   PORT=5000
   MONGO_URL=mongodb://127.0.0.1:27017/inventory_db
   ```

3. **Start the application:**
   ```bash
   node server.js
   ```
   The API will be live at `http://localhost:5000/api/products`.

---

##  Repository Structure

```
├── config/
│   └── db.js                 # MongoDB connection logic
├── controller/
│   └── productController.js  # Request handlers for all routes
├── middleware/
│   ├── errorHandler.js       # Global centralized error middleware
│   └── validate.js           # Payload & input validation rules
├── model/
│   └── product.js            # Mongoose Product model & schema definition
├── routes/
│   └── productRoutes.js      # Endpoint route declarations
├── .env                      # Local environment configuration
├── .gitignore                # Git ignored patterns
├── package.json              # Project dependencies
├── README.md                 # Project documentation
└── server.js                 # Application entry point
```

---

##  Database Schema — Product Model

| Field | Type | Rules & Validation | Notes |
| :--- | :--- | :--- | :--- |
| `name` | String | Required, trimmed | Product display name |
| `sku` | String | Required, Unique, trimmed | Unique product identifier |
| `category` | String | Required, trimmed | Classification tag |
| `price` | Number | Required, Min: 0 | Price per item |
| `quantity` | Number | Required, Min: 0, Default: 0 | Current warehouse stock |
| `reorderLevel` | Number | Min: 0, Default: 10 | Low stock threshold alert |
| `supplier` | String | Optional, trimmed | Vendor or manufacturer |
| `stockValue` | Number | Virtual (`price * quantity`) | Auto-calculated stock worth |

---

##  API Endpoints

### 1. Product Catalog Endpoints
| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/products` | Create and store a new product document |
| `GET` | `/api/products` | Retrieve catalog with pagination, search, and filters |
| `GET` | `/api/products/:id` | Fetch details of a single product by ID |
| `PUT` | `/api/products/:id` | Update complete product information |
| `PATCH` | `/api/products/:id` | Partially update product fields |
| `DELETE` | `/api/products/:id` | Remove a product from the database |

### 2. Stock Modification
| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `PATCH` | `/api/products/:id/stock` | Adjust inventory levels safely (`{ "change": <number> }`) |

* **Restocking:** Provide a positive integer to increase stock (e.g., `{"change": 15}`).
* **Sales / Dispatch:** Provide a negative integer to decrease stock (e.g., `{"change": -5}`).
* **Overdraft Protection:** Prevents negative inventory. Decrement requests that would drop stock below zero are rejected with a `400 Bad Request`.

### 3. Inventory Reports & Aggregations
| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products/low-stock` | Retrieves all items where `quantity <= reorderLevel` |
| `GET` | `/api/products/summary` | Aggregates category stats (item count, total quantity, total stock value, average price) |

---

##  Query Parameters (`GET /api/products`)

You can combine any of the following query options:

| Parameter | Type | Example | Purpose |
| :--- | :--- | :--- | :--- |
| `category` | String | `?category=Stationery` | Filter by category |
| `search` | String | `?search=table` | Case-insensitive search in `name` or `sku` |
| `minPrice` | Number | `?minPrice=200` | Filter items with price >= minPrice |
| `maxPrice` | Number | `?maxPrice=1500` | Filter items with price <= maxPrice |
| `sort` | String | `?sort=price:desc` | Sort by field ascending (`:asc`) or descending (`:desc`) |
| `page` | Integer | `?page=1` | Target page index (default: 1) |
| `limit` | Integer | `?limit=10` | Records per page (default: 10) |
