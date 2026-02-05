import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronLeft, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

function MonthlyAnalytics({ month, year, expenses, onBack }) {
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Calculate category totals
  const categoryData = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  })).sort((a, b) => b.value - a.value);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const average = expenses.length > 0 ? total / expenses.length : 0;
  const topCategory = pieData[0] || { name: 'None', value: 0 };

  // Daily spending trend
  const dailyData = {};
  expenses.forEach(exp => {
    const day = new Date(exp.date).getDate();
    dailyData[day] = (dailyData[day] || 0) + exp.amount;
  });

  const barData = Object.entries(dailyData).map(([day, amount]) => ({
    day: `Day ${day}`,
    amount: parseFloat(amount.toFixed(2))
  })).sort((a, b) => parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1]));

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
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
            {monthName} Analytics
          </h1>
          <div className="w-20" />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass card-3d p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <DollarSign className="text-indigo-400" size={24} />
              </div>
              <p className="text-gray-400 text-sm">Total Spent</p>
            </div>
            <p className="text-3xl font-bold text-indigo-400">₹{total.toFixed(2)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass card-3d p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="text-purple-400" size={24} />
              </div>
              <p className="text-gray-400 text-sm">Transactions</p>
            </div>
            <p className="text-3xl font-bold text-purple-400">{expenses.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass card-3d p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <ShoppingBag className="text-emerald-400" size={24} />
              </div>
              <p className="text-gray-400 text-sm">Average</p>
            </div>
            <p className="text-3xl font-bold text-emerald-400">₹{average.toFixed(2)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass card-3d p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <TrendingUp className="text-pink-400" size={24} />
              </div>
              <p className="text-gray-400 text-sm">Top Category</p>
            </div>
            <p className="text-xl font-bold text-pink-400">{topCategory.name}</p>
            <p className="text-sm text-gray-400">₹{topCategory.value.toFixed(2)}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold mb-6">Spending by Category</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-12">No data available</p>
            )}
          </motion.div>

          {/* Category Breakdown Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold mb-6">Category Breakdown</h2>
            <div className="space-y-3">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-3 glass rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{item.value.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">
                      {((item.value / total) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Daily Trend Bar Chart */}
        {barData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass p-6 rounded-xl mt-8"
          >
            <h2 className="text-xl font-bold mb-6">Daily Spending Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MonthlyAnalytics;
