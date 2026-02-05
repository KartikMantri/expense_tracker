import { motion } from 'framer-motion';
import { ChevronLeft, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';

function DailyExpenseView({ date, expenses, onAddExpense, onDeleteExpense, onBack }) {
  const dateStr = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryColors = {
    Food: 'bg-orange-500/20 text-orange-400 border-orange-400',
    Transport: 'bg-blue-500/20 text-blue-400 border-blue-400',
    Entertainment: 'bg-purple-500/20 text-purple-400 border-purple-400',
    Shopping: 'bg-pink-500/20 text-pink-400 border-pink-400',
    Bills: 'bg-red-500/20 text-red-400 border-red-400',
    Health: 'bg-emerald-500/20 text-emerald-400 border-emerald-400',
    Education: 'bg-indigo-500/20 text-indigo-400 border-indigo-400',
    Groceries: 'bg-lime-500/20 text-lime-400 border-lime-400',
    Rent: 'bg-rose-500/20 text-rose-400 border-rose-400',
    Utilities: 'bg-cyan-500/20 text-cyan-400 border-cyan-400',
    Insurance: 'bg-violet-500/20 text-violet-400 border-violet-400',
    Travel: 'bg-sky-500/20 text-sky-400 border-sky-400',
    Fitness: 'bg-teal-500/20 text-teal-400 border-teal-400',
    Subscriptions: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-400',
    Gifts: 'bg-amber-500/20 text-amber-400 border-amber-400',
    'Personal Care': 'bg-yellow-500/20 text-yellow-400 border-yellow-400',
    Home: 'bg-slate-500/20 text-slate-400 border-slate-400',
    Pets: 'bg-green-500/20 text-green-400 border-green-400',
    Charity: 'bg-blue-600/20 text-blue-300 border-blue-300',
    Other: 'bg-gray-500/20 text-gray-400 border-gray-400'
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="glass px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back to Calendar
          </button>
        </div>

        {/* Date Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-2xl mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="text-indigo-400" size={32} />
            <div>
              <h1 className="text-2xl font-bold">{dateStr}</h1>
              <p className="text-gray-400">Daily Expenses</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Spent</p>
              <p className="text-3xl font-bold text-indigo-400">₹{total.toFixed(2)}</p>
            </div>
            <button
              onClick={onAddExpense}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>
        </motion.div>

        {/* Expenses List */}
        {expenses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-12 rounded-2xl text-center"
          >
            <p className="text-gray-400 text-lg mb-4">No expenses for this day</p>
            <button
              onClick={onAddExpense}
              className="glass px-6 py-3 rounded-lg hover:bg-indigo-500/20 transition-all"
            >
              Add Your First Expense
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense, index) => (
              <motion.div
                key={expense._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass card-3d p-6 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{expense.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full border ${
                        categoryColors[expense.category] || categoryColors.Other
                      }`}>
                        {expense.category}
                      </span>
                    </div>
                    {expense.description && (
                      <p className="text-gray-400 text-sm mb-2">{expense.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(expense.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-indigo-400">
                      ₹{expense.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => onDeleteExpense(expense._id)}
                      className="glass p-3 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyExpenseView;
