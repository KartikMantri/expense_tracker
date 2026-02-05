// ENVIRONMENT VARIABLES: Load secrets from .env file
require('dotenv').config();

// DATABASE CONNECTION: Import our connection function
const connectDB = require('./config/db');

const express = require("express"); // Imports the Express framework
const cors = require('cors'); // Import CORS for frontend-backend communication
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const app = express(); // Creates an instance of an Express application
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// CONNECT TO DATABASE: Call the function to establish MongoDB connection
connectDB();

// IMPORT MODELS: Import our Mongoose models
const Expense = require('./models/Expense');
const User = require('./models/User');

// IMPORT MIDDLEWARE
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// LOGGING HELPERS
const isProduction = process.env.NODE_ENV === 'production';
const debugLog = (msg, data) => {
    if (!isProduction) {
        console.log(`[DEBUG] ${msg}`, data || '');
    }
};

// MIDDLEWARE: Enable CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    'https://your-frontend.vercel.app'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // Or if the origin is in our allowed list
        if (!origin || allowedOrigins.some(o => origin.startsWith(o)) || isProduction) {
            callback(null, true);
        } else {
            console.log('CORS Blocked Origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// MIDDLEWARE: JSON parsing
app.use(express.json());

// DEBUG REQUEST LOGGING
app.use((req, res, next) => {
    debugLog(`${req.method} ${req.url}`);
    next();
});

// ========== TEST ROUTE ==========
app.get("/", (req, res) => {
    res.json({ message: "Expense Tracker API is running!" });
});

// ========== AUTH ROUTES ==========

// REGISTER
app.post("/api/register",
    [
        body('username').notEmpty().trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { username, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: 'User already exists' });

            user = new User({ username, email, password });
            await user.save();

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
        } catch (err) {
            res.status(500).json({ message: 'Server error during registration' });
        }
    }
);

// LOGIN
app.post("/api/login",
    [
        body('email').isEmail().normalizeEmail(),
        body('password').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
        } catch (err) {
            res.status(500).json({ message: 'Server error during login' });
        }
    }
);

// ========== EXPENSE ROUTES (Protected) ==========

// READ (ALL)
app.get("/api/expenses", auth, async (req, res) => {
    try {
        const filter = { userId: req.user.userId };
        if (req.query.category) filter.category = req.query.category;
        
        let query = Expense.find(filter);
        if (req.query.sort) query = query.sort(req.query.sort);
        
        const expenses = await query;
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE
app.post("/api/expenses", auth,
    [
        body('title').notEmpty().trim(),
        body('amount').isNumeric().isFloat({ min: 0 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const expenseData = { ...req.body, userId: req.user.userId };
            const newExpense = await Expense.create(expenseData);
            res.status(201).json(newExpense);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
);

// DELETE
app.delete("/api/expenses/:id", auth,
    [param('id').isMongoId()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
            if (!expense) return res.status(404).json({ message: "Expense not found" });
            res.json({ message: "Expense deleted successfully", expense });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// ERROR HANDLING
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
