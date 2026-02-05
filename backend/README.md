# Expense Tracker API

A RESTful API for managing personal expenses built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ Full CRUD operations for expenses
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation with express-validator
- ✅ Centralized error handling
- ✅ Query parameters for filtering and sorting
- ✅ Environment variables for configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd expense_tracker
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
```

4. **Start the server**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints Overview

| Method | Endpoint            | Description                               |
| ------ | ------------------- | ----------------------------------------- |
| GET    | `/`                 | Welcome message                           |
| GET    | `/api/expenses`     | Get all expenses (with filtering/sorting) |
| GET    | `/api/expenses/:id` | Get expense by ID                         |
| POST   | `/api/expenses`     | Create new expense                        |
| DELETE | `/api/expenses/:id` | Delete expense                            |

---

## 📖 Detailed API Documentation

### 1. Get All Expenses

Get a list of all expenses, with optional filtering and sorting.

**Endpoint:** `GET /api/expenses`

**Query Parameters:**

- `category` (optional) - Filter by category (Food, Transport, Entertainment, Bills, Other)
- `sort` (optional) - Sort by field (amount, date, createdAt). Prefix with `-` for descending order

**Example Requests:**

```bash
# Get all expenses
GET /api/expenses

# Get only Food expenses
GET /api/expenses?category=Food

# Get expenses sorted by amount (highest first)
GET /api/expenses?sort=-amount

# Combine filters
GET /api/expenses?category=Transport&sort=-date
```

**Success Response (200 OK):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Lunch",
    "amount": 250,
    "category": "Food",
    "date": "2026-02-04T00:00:00.000Z",
    "createdAt": "2026-02-04T12:00:00.000Z",
    "updatedAt": "2026-02-04T12:00:00.000Z",
    "__v": 0
  }
]
```

---

### 2. Get Expense by ID

Get a single expense by its ID.

**Endpoint:** `GET /api/expenses/:id`

**URL Parameters:**

- `id` (required) - MongoDB ObjectId of the expense

**Example Request:**

```bash
GET /api/expenses/507f1f77bcf86cd799439011
```

**Success Response (200 OK):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-02-04T00:00:00.000Z",
  "createdAt": "2026-02-04T12:00:00.000Z",
  "updatedAt": "2026-02-04T12:00:00.000Z",
  "__v": 0
}
```

**Error Responses:**

_400 Bad Request - Invalid ID format:_

```json
{
  "errors": [
    {
      "msg": "Invalid expense ID",
      "param": "id",
      "location": "params"
    }
  ]
}
```

_404 Not Found - Expense doesn't exist:_

```json
{
  "message": "Expense not found"
}
```

---

### 3. Create New Expense

Create a new expense.

**Endpoint:** `POST /api/expenses`

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Dinner",
  "amount": 350,
  "category": "Food",
  "description": "Dinner at restaurant"
}
```

**Required Fields:**

- `title` (string) - Max 100 characters
- `amount` (number) - Must be positive

**Optional Fields:**

- `category` (string) - One of: Food, Transport, Entertainment, Bills, Other (default: Other)
- `description` (string) - Max 500 characters
- `date` (date) - Defaults to current date

**Success Response (201 Created):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Dinner",
  "amount": 350,
  "category": "Food",
  "description": "Dinner at restaurant",
  "date": "2026-02-04T00:00:00.000Z",
  "createdAt": "2026-02-04T12:00:00.000Z",
  "updatedAt": "2026-02-04T12:00:00.000Z",
  "__v": 0
}
```

**Error Response (400 Bad Request - Validation Failed):**

```json
{
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    },
    {
      "msg": "Amount must be positive",
      "param": "amount",
      "location": "body"
    }
  ]
}
```

---

### 4. Delete Expense

Delete an expense by ID.

**Endpoint:** `DELETE /api/expenses/:id`

**URL Parameters:**

- `id` (required) - MongoDB ObjectId of the expense

**Example Request:**

```bash
DELETE /api/expenses/507f1f77bcf86cd799439011
```

**Success Response (200 OK):**

```json
{
  "message": "Expense deleted successfully",
  "expense": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Lunch",
    "amount": 250,
    "category": "Food"
  }
}
```

**Error Responses:**

_400 Bad Request - Invalid ID:_

```json
{
  "errors": [
    {
      "msg": "Invalid expense ID",
      "param": "id",
      "location": "params"
    }
  ]
}
```

_404 Not Found:_

```json
{
  "message": "Expense not found"
}
```

---

## 🎨 Expense Schema

```javascript
{
  title: String (required, max 100 chars),
  amount: Number (required, min 0),
  category: String (enum: ['Food', 'Transport', 'Entertainment', 'Bills', 'Other']),
  date: Date (default: now),
  description: String (max 500 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔒 Security Features

- **Input Validation**: All inputs are validated using express-validator
- **MongoDB Injection Protection**: Mongoose sanitizes queries
- **Error Handling**: Centralized error handler prevents information leakage
- **Environment Variables**: Sensitive data stored in .env file

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Validation**: express-validator
- **Environment**: dotenv

## 📁 Project Structure

```
expense_tracker/
├── config/
│   └── db.js              # Database connection
├── middleware/
│   ├── errorHandler.js    # Centralized error handling
│   └── asyncHandler.js    # Async route wrapper
├── models/
│   └── Expense.js         # Expense schema & model
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── index.js              # Main application file
├── package.json          # Dependencies
└── README.md             # This file
```

## 🧪 Testing with Thunder Client

1. Install Thunder Client extension in VS Code
2. Import the test collection (if provided)
3. Update the base URL if needed
4. Run the requests

## 🚀 Deployment

This API can be deployed to:

- Render
- Railway
- Heroku
- Vercel (serverless)
- AWS/Google Cloud/Azure

Make sure to:

1. Set environment variables on the hosting platform
2. Update MongoDB Atlas to whitelist the hosting platform's IP
3. Use production-ready error handling

## 📝 License

MIT

## 👤 Author

Your Name

---

**Built with ❤️ as part of Backend Development Learning**
