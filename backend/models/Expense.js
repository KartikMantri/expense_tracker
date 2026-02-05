const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
        enum: [
            'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 
            'Health', 'Education', 'Groceries', 'Rent', 'Utilities', 
            'Insurance', 'Travel', 'Fitness', 'Subscriptions', 'Gifts', 
            'Personal Care', 'Home', 'Pets', 'Charity', 'Other'
        ],
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
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
