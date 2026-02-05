import { motion } from 'framer-motion';

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

function MonthSelector({ selectedMonth, onMonthSelect, currentYear }) {
  const currentMonth = new Date().getMonth();

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Select Month
        </h1>
        <p className="text-center text-gray-400 mb-12">{currentYear}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {months.map((month, index) => {
            const isPast = index < currentMonth;
            const isCurrent = index === currentMonth;
            const isFuture = index > currentMonth;

            return (
              <motion.button
                key={month}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMonthSelect(index)}
                className={`glass card-3d p-6 rounded-xl relative overflow-hidden ${
                  selectedMonth === index 
                    ? 'bg-indigo-500/30 border-2 border-indigo-400' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="relative z-10">
                  <p className="text-xl font-bold mb-1">{month}</p>
                  {isCurrent && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                  {isPast && (
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                      View Analytics
                    </span>
                  )}
                  {isFuture && (
                    <span className="text-xs text-gray-500">
                      Upcoming
                    </span>
                  )}
                </div>
                
                {/* Gradient overlay for current month */}
                {isCurrent && (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default MonthSelector;
