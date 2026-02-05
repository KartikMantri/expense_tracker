import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, BarChart3 } from 'lucide-react';

function Calendar({ year, month, expenses, onDateSelect, onBack, onViewAnalytics }) {
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  
  // Calculate total expenses per day
  const expensesByDay = {};
  expenses.forEach(exp => {
    const expDate = new Date(exp.date);
    if (expDate.getMonth() === month && expDate.getFullYear() === year) {
      const date = expDate.getDate();
      expensesByDay[date] = (expensesByDay[date] || 0) + exp.amount;
    }
  });

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const currentDate = today.getDate();
  const isPastMonth = month < today.getMonth() || year < today.getFullYear();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="glass px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {monthName} {year}
          </h1>
          {isPastMonth && expenses.length > 0 && (
            <button
              onClick={onViewAnalytics}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              <BarChart3 size={20} />
              View Analytics
            </button>
          )}
          {!isPastMonth && <div className="w-32" />}
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-gray-400 font-semibold py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array(firstDay).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {/* Date cells */}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1;
            const hasExpenses = expensesByDay[day] > 0;
            const isToday = isCurrentMonth && day === currentDate;
            
            return (
              <motion.button
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (firstDay + i) * 0.01 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDateSelect(day)}
                className={`glass card-3d aspect-square p-2 rounded-xl relative flex flex-col items-center justify-center ${
                  isToday ? 'border-2 border-indigo-400 bg-indigo-500/20' : ''
                } ${
                  hasExpenses ? 'border-2 border-emerald-400/50' : ''
                }`}
              >
                <p className={`text-lg font-semibold ${isToday ? 'text-indigo-400' : ''}`}>
                  {day}
                </p>
                {hasExpenses && (
                  <div className="mt-1 flex flex-col items-center">
                    <TrendingUp size={12} className="text-emerald-400" />
                    <p className="text-xs text-emerald-400 font-semibold">
                      ₹{expensesByDay[day].toFixed(0)}
                    </p>
                  </div>
                )}
                {isToday && !hasExpenses && (
                  <div className="absolute bottom-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-bold mb-4">Month Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-indigo-400">
                ₹{Object.values(expensesByDay).reduce((a, b) => a + b, 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Days with Expenses</p>
              <p className="text-2xl font-bold text-purple-400">
                {Object.keys(expensesByDay).length}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Transactions</p>
              <p className="text-2xl font-bold text-emerald-400">
                {expenses.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Calendar;
