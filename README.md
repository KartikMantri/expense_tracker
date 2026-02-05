# 📊 Expense Tracker - Full Stack Application

A complete expense tracking application with month-based navigation, analytics, and beautiful UI.

## 🚀 Features

### Backend

- ✅ Express.js REST API with MongoDB Atlas
- ✅ JWT authentication with secure tokens
- ✅ User registration and login
- ✅ CRUD operations for expenses
- ✅ 20 expense categories
- ✅ Input validation with express-validator
- ✅ Environment-based CORS
- ✅ Production-ready configuration

### Frontend

- ✅ React 19 + Vite application
- ✅ Month-based expense tracking
- ✅ Interactive calendar view
- ✅ Daily expense management
- ✅ Monthly analytics with charts (Recharts)
- ✅ Glassmorphic UI design
- ✅ Framer Motion animations
- ✅ Automatic token expiration handling
- ✅ 20 categories with color coding

## 📁 Project Structure

```
expense-tracker/
├── backend/              # Express.js API
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth, error handling
│   ├── models/          # Mongoose models
│   ├── .env.example     # Environment template
│   └── index.js         # Main server file
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Login, Register
│   │   └── services/    # API calls
│   ├── .env.example     # Environment template
│   └── index.html       # Entry point
│
└── README.md           # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js 16+
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. **Navigate to backend:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret
```

4. **Start development server:**

```bash
npm run dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:3000
```

4. **Start development server:**

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Deployment

### Backend - NodeOps.ai

1. Sign up at [nodeops.ai](https://nodeops.ai)
2. Create a new Project and connect this repository: `KartikMantri/expense_tracker`
3. Set **Root Directory** to `backend`
4. Use **Build Command**: `npm install`
5. Use **Start Command**: `node index.js`
6. Add environment variables in the **Environment Variables** tab.

### Frontend - Vercel

1. Import this repository
2. Root directory: `frontend`
3. Framework: Vite
4. Add environment variable: `VITE_API_URL`

## 📚 API Endpoints

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | `/api/register`     | Register new user |
| POST   | `/api/login`        | Login user        |
| GET    | `/api/expenses`     | Get all expenses  |
| POST   | `/api/expenses`     | Create expense    |
| DELETE | `/api/expenses/:id` | Delete expense    |

## 🎨 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcrypt
- express-validator

### Frontend

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Axios

## 📝 License

ISC

## 👤 Author

Kartik Mantri

---

**Built with ❤️ as a full-stack learning project**
