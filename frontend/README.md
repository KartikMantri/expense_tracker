<<<<<<< HEAD
# 📊 Expense Tracker - Frontend

Beautiful month-based expense tracking application built with React, Vite, and Tailwind CSS.

## ✨ Features

- 🗓️ **Month-Based Tracking** - Select a month, view calendar, manage daily expenses
- 📅 **Interactive Calendar** - Visual calendar with expense indicators
- 💰 **Daily Expense Management** - Add, view, and delete expenses for specific dates
- 📊 **Monthly Analytics** - Charts and insights for past months (Recharts)
- 🎨 **Glassmorphic UI** - Modern, beautiful design with smooth animations
- 🔐 **JWT Authentication** - Secure login and registration
- 📱 **Responsive Design** - Works on all devices
- 🎭 **20 Categories** - Comprehensive expense categorization with color coding

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Backend API running (see backend README)

### Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd expense_tracker_frontend
```

2. **Install dependencies:**
=======
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
>>>>>>> d44fc5116ae73477df1c5c833cf8ce42dbfc9db5

```bash
npm install
```

<<<<<<< HEAD
3. **Set up environment variables:**

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your backend URL
# For development:
VITE_API_URL=http://localhost:3000
```

4. **Start development server:**

```bash
npm run dev
```

5. **Open browser:**

```
http://localhost:5173
```

## 📦 Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

The build output will be in the `dist/` folder.

## 🌍 Environment Variables
=======
3. **Set up environment variables**
>>>>>>> d44fc5116ae73477df1c5c833cf8ce42dbfc9db5

Create a `.env` file in the root directory:

```env
<<<<<<< HEAD
# Backend API URL
VITE_API_URL=http://localhost:3000
```

For production, update to your deployed backend URL:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library for analytics
- **Lucide React** - Icon library
- **Axios** - HTTP client
=======
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
>>>>>>> d44fc5116ae73477df1c5c833cf8ce42dbfc9db5

## 📁 Project Structure

```
<<<<<<< HEAD
src/
├── components/
│   ├── MonthSelector.jsx    # Month selection grid
│   ├── Calendar.jsx          # Interactive calendar view
│   ├── DailyExpenseView.jsx  # Daily expense management
│   └── MonthlyAnalytics.jsx  # Charts and insights
├── pages/
│   ├── Login.jsx             # Login page
│   └── Register.jsx          # Registration page
├── services/
│   └── api.js                # API calls to backend
├── App.jsx                   # Main app component
├── index.css                 # Global styles
└── main.jsx                  # Entry point
```

## 🎨 Features in Detail

### Month Selector

- Grid of 12 months
- Status indicators (Current, View Analytics, Upcoming)
- Smooth animations

### Calendar View

- Full month calendar
- Expense indicators on dates
- Today highlighting
- Month summary statistics

### Daily Expense View

- Add expenses for specific dates
- View all expenses for a day
- Delete expenses
- Category-based color coding

### Monthly Analytics

- Pie chart for category distribution
- Bar chart for daily spending trends
- Summary cards (total, average, top category)
- Category breakdown table

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Import your repository**
4. **Add environment variable:**
   - `VITE_API_URL` = Your backend URL
5. **Deploy!**

See [deployment_guide.md](../deployment_guide.md) for detailed instructions.

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

1. **Register/Login** - Create an account or sign in
2. **Select Month** - Choose a month from the grid
3. **View Calendar** - See all dates with expense indicators
4. **Add Expenses** - Click a date and add expenses
5. **View Analytics** - For past months, click "View Analytics"

## 🐛 Troubleshooting

### "Failed to fetch" errors

- Ensure backend is running
- Check `VITE_API_URL` in `.env`
- Verify CORS is configured on backend

### Build fails

- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors
- Clear `dist/` folder and rebuild

## 📄 License

ISC

## 👤 Author

Kartik

---

**Need help?** Check the [deployment guide](../deployment_guide.md) or create an issue.
=======
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
>>>>>>> d44fc5116ae73477df1c5c833cf8ce42dbfc9db5
