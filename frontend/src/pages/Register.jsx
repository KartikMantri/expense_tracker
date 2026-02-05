import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { register } from '../services/api';

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      console.log('Attempting registration with:', { ...registerData, password: '***' });
      const response = await register(registerData);
      console.log('Registration successful:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      onRegisterSuccess(response.user);
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response);
      
      // Extract detailed error message
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        // Server responded with error
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.errors && err.response.data.errors.length > 0) {
          errorMessage = err.response.data.errors.map(e => e.msg).join(', ');
        }
      } else if (err.request) {
        // Request made but no response
        errorMessage = `Cannot connect to server. Make sure backend is running at ${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`;
      } else {
        // Something else went wrong
        errorMessage = err.message || 'Unknown error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-2xl max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block p-4 bg-purple-500/20 rounded-full mb-4"
          >
            <UserPlus className="text-purple-400" size={40} />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">Start tracking your expenses today</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2"
          >
            <AlertCircle size={20} className="text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full glass pl-12 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Choose a username"
                minLength={3}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full glass pl-12 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full glass pl-12 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Create a password"
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full glass pl-12 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
