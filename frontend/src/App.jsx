import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { getExpenses, createExpense, deleteExpense } from './services/api';
import Login from './pages/Login';
import Register from './pages/Register';
import MonthSelector from './components/MonthSelector';
import Calendar from './components/Calendar';
import DailyExpenseView from './components/DailyExpenseView';
import MonthlyAnalytics from './components/MonthlyAnalytics';
import './index.css';

const CATEGORIES = [
  'Food', 
  'Transport', 
  'Entertainment', 
  'Shopping', 
  'Bills', 
  'Health', 
  'Education',
  'Groceries',
  'Rent',
  'Utilities',
  'Insurance',
  'Travel',
  'Fitness',
  'Subscriptions',
  'Gifts',
  'Personal Care',
  'Home',
  'Pets',
  'Charity',
  'Other'
];


function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Navigation state
  const [view, setView] = useState('month-select'); // month-select | calendar | daily | analytics
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // Expense state
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    description: ''
  });

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch expenses when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchExpenses();
    }
  }, [isAuthenticated]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        showToast('Failed to fetch expenses', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    try {
      // Create expense with selected date
      const expenseDate = selectedDate 
        ? new Date(selectedYear, selectedMonth, selectedDate)
        : new Date();

      const newExpense = await createExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        date: expenseDate.toISOString()
      });
      setExpenses([...expenses, newExpense]);
      setShowModal(false);
      setFormData({ title: '', amount: '', category: 'Food', description: '' });
      showToast('Expense added successfully!', 'success');
    } catch (error) {
      const errorMsg = error.response?.data?.errors?.[0]?.msg || 'Failed to create expense';
      showToast(errorMsg, 'error');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(exp => exp._id !== id));
      showToast('Expense deleted', 'success');
    } catch (error) {
      showToast('Failed to delete expense', 'error');
    }
  };

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    showToast(`Welcome back, ${user.username}!`, 'success');
  };

  const handleRegisterSuccess = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    showToast(`Welcome, ${user.username}!`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setExpenses([]);
    setView('month-select');
    showToast('Logged out successfully', 'success');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Filter expenses by selected month
  const monthlyExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === selectedMonth && expDate.getFullYear() === selectedYear;
  });

  // Filter expenses by selected date
  const dailyExpenses = selectedDate 
    ? monthlyExpenses.filter(exp => new Date(exp.date).getDate() === selectedDate)
    : [];

  // Check if month has ended
  const currentMonth = new Date().getMonth();
  const monthEnded = selectedMonth < currentMonth;

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        {showRegister ? (
          <Register 
            onRegisterSuccess={handleRegisterSuccess} 
            onSwitchToLogin={() => setShowRegister(false)} 
          />
        ) : (
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            onSwitchToRegister={() => setShowRegister(true)} 
          />
        )}
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
                toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      {view === 'month-select' && (
        <MonthSelector
          selectedMonth={selectedMonth}
          onMonthSelect={(month) => {
            setSelectedMonth(month);
            setView('calendar');
          }}
          currentYear={selectedYear}
        />
      )}

      {view === 'calendar' && (
        <Calendar
          year={selectedYear}
          month={selectedMonth}
          expenses={monthlyExpenses}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setView('daily');
          }}
          onBack={() => setView('month-select')}
          onViewAnalytics={() => setView('analytics')}
        />
      )}

      {view === 'daily' && (
        <DailyExpenseView
          date={new Date(selectedYear, selectedMonth, selectedDate)}
          expenses={dailyExpenses}
          onAddExpense={() => setShowModal(true)}
          onDeleteExpense={handleDeleteExpense}
          onBack={() => setView('calendar')}
        />
      )}

      {view === 'analytics' && (
        <MonthlyAnalytics
          month={selectedMonth}
          year={selectedYear}
          expenses={monthlyExpenses}
          onBack={() => setView('calendar')}
        />
      )}

      {/* Add Expense Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-8 rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Add Expense</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="glass p-2 rounded-lg hover:bg-red-500/20"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateExpense} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full glass px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Lunch"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full glass px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full glass px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800/50 text-white"
                    style={{ colorScheme: 'dark' }}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-slate-800 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description (Optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full glass px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows="3"
                    placeholder="Add details..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all font-semibold"
                >
                  Add Expense
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
              toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
