// ENVIRONMENT VARIABLES: Load secrets from .env file
require('dotenv').config();

// DATABASE CONNECTION: Import our connection function
const connectDB = require('./config/db');

const express = require("express"); // Imports the Express framework
const cors = require('cors'); // Import CORS for frontend-backend communication
const { body, param, validationResult } = require('express-validator');
const app = express(); // Creates an instance of an Express application
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// CONNECT TO DATABASE: Call the function to establish MongoDB connection
connectDB();

// IMPORT MODELS: Import our Mongoose models
const Expense = require('./models/Expense');
// IMPORT ERROR HANDLER
const errorHandler = require('./middleware/errorHandler');

// MIDDLEWARE: Enable CORS for frontend (allow requests from React app)
app.use(cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true
}));

// MIDDLEWARE: This allows the server to read JSON from the request body
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url}`);
    next();
});


// HOME ROUTE: A simple GET request to the root URL.
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Expense Tracker API" });
});

// READ (ALL): GET request to fetch all expenses from database
// READ (ALL): GET request to fetch all expenses with filtering and sorting
app.get("/api/expenses", async (req, res) => {
    try {
        // Step 1: Build a filter object
        const filter = {};
        
        // Step 2: If category is provided, add it to filter
        if (req.query.category) {
            filter.category = req.query.category;
            console.log("Filter:", filter);
        }
        
        // Step 3: Find expenses with the filter
        let query = Expense.find(filter);
        
        // Step 4: If sort is provided, apply sorting
        if (req.query.sort) {
            query = query.sort(req.query.sort);
        }
        
        // Step 5: Execute the query
        const expenses = await query;
        
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE: POST request to add a new expense to database
// CREATE: POST request with VALIDATION
app.post("/api/expenses", 
    // Validation rules (middleware array)
    [
        body('title')
            .notEmpty().withMessage('Title is required')
            .trim()
            .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
        body('amount')
            .notEmpty().withMessage('Amount is required')
            .isNumeric().withMessage('Amount must be a number')
            .isFloat({ min: 0 }).withMessage('Amount must be positive'),
        body('category')
            .optional()
            .isIn(['Food', 'Transport', 'Entertainment', 'Bills', 'Other'])
            .withMessage('Category must be one of: Food, Transport, Entertainment, Bills, Other')
    ],
    // Route handler
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // If validation passes, create expense
        try {
            const newExpense = await Expense.create(req.body);
            res.status(201).json(newExpense);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
);

// READ (ONE): GET request to fetch a single expense by ID
// READ (ONE): GET request with ID VALIDATION
app.get("/api/expenses/:id",
    [param('id').isMongoId().withMessage('Invalid expense ID')],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const expense = await Expense.findById(req.params.id);
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            res.json(expense);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// DELETE: Remove an expense by its ID from database
// DELETE: Remove expense with ID VALIDATION
app.delete("/api/expenses/:id",
    [param('id').isMongoId().withMessage('Invalid expense ID')],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const expense = await Expense.findByIdAndDelete(req.params.id);
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            res.json({ message: "Expense deleted successfully", expense });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);
// ERROR HANDLING MIDDLEWARE (must be last!)
app.use(errorHandler);

// START SERVER: Tells the app to start listening for requests.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
