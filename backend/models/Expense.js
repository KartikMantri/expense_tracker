// Import mongoose
const mongoose = require('mongoose');

// SCHEMA: Define the structure of an expense document
const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
        min: [0, 'Amount cannot be negative']
    },
    category: {
        type: String,
        enum: ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'],
        default: 'Other'
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters']
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// MODEL: Create the model from the schema
// 'Expense' is the model name, MongoDB will create a collection called 'expenses'
const Expense = mongoose.model('Expense', expenseSchema);

// Export the model so we can use it in our routes
module.exports = Expense;
