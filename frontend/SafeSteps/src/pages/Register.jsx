import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'tourist',
    phone: '',
    emergencyContact: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - replace with actual API call
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.name,
        type: formData.userType,
        phone: formData.phone
      };
      
      login(user);
      navigate(formData.userType === 'admin' ? '/admin' : '/tourist');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-cyan-50 to-teal-100">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-12 text-center">
            <div className="bg-white p-3 rounded-full inline-block mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Join SafeTour</h2>
            <p className="text-cyan-100 mt-2">Create your secure account today</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-400 transition">
                  <input
                    type="radio"
                    name="userType"
                    value="tourist"
                    checked={formData.userType === 'tourist'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`text-center ${formData.userType === 'tourist' ? 'text-teal-600' : 'text-gray-600'}`}>
                    <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z"/>
                    </svg>
                    <span className="font-semibold">Tourist</span>
                  </div>
                </label>
                <label className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-400 transition">
                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={formData.userType === 'admin'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`text-center ${formData.userType === 'admin' ? 'text-teal-600' : 'text-gray-600'}`}>
                    <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-semibold">Admin</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Emergency contact number"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center mt-6">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-teal-600 hover:text-teal-800 font-semibold">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;