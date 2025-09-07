import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AboutUs from './AboutUs';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-400 to-teal-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-full">
              <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">SafeTour</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-cyan-200 transition">Home</Link>
            <Link to="/about" className="text-white hover:text-cyan-200 transition">About Us</Link>
            <Link to="/services" className="text-white hover:text-cyan-200 transition">Services</Link>
            <Link to="/contact" className="text-white hover:text-cyan-200 transition">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white">Welcome, {user.name}</span>
                <Link 
                  to={user.type === 'admin' ? '/admin' : '/tourist'}
                  className="bg-white text-teal-600 px-4 py-2 rounded-full hover:bg-cyan-50 transition"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-white hover:text-cyan-200 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-white text-teal-600 px-4 py-2 rounded-full hover:bg-cyan-50 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;