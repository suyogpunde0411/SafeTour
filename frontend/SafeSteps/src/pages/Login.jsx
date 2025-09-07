import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'tourist'
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const user = {
        id: '123',
        email: formData.email,
        name: formData.userType === 'admin' ? 'Admin User' : 'Tourist User',
        type: formData.userType
      };
      setSuccess(true);
      setTimeout(() => {
        console.log('Navigating to:', formData.userType === 'admin' ? '/admin' : '/tourist');
        // navigate(formData.userType === 'admin' ? '/admin' : '/tourist');
      }, 1500);
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-cyan-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-8 text-center">
            <div className="bg-white p-2 rounded-full inline-block mb-4">
              <CheckCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-cyan-100 text-base">Sign in to SafeTour</p>
          </div>
          {/* Form Section */}
          <form className="px-6 py-6 space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${formData.email ? 'text-teal-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`w-full pl-10 pr-3 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:outline-none text-gray-800 placeholder-gray-500 ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-teal-400'
                  }`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${formData.password ? 'text-teal-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:outline-none text-gray-800 placeholder-gray-500 ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-teal-400'
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-500"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>
            {/* User Type Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="userType">
                Login as
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-teal-500" />
                </div>
                <select
                  name="userType"
                  id="userType"
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-teal-400 focus:outline-none text-gray-800"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="tourist">Tourist</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-xl mt-2">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{errors.general}</span>
                </div>
              </div>
            )}
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-xl mt-2">
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Login successful! Redirecting...</span>
                </div>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white ${
                loading || success
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Success!</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </div>
            </button>
            {/* Footer Links */}
            <div className="text-center space-y-2 pt-2">
              <a href="#" className="text-sm text-teal-600 hover:text-cyan-700 font-medium hover:underline">
                Forgot your password?
              </a>
              <div className="text-center">
                <span className="text-gray-600 text-sm">Don't have an account? </span>
                <a href="#" className="text-teal-600 hover:text-cyan-700 font-semibold hover:underline">
                  Create Account
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;