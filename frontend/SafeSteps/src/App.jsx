import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import TouristPortal from './pages/TouristPortal';
// import AdminPortal from './pages/AdminPortal';
import './App.css';
function App() {

  return (
     <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">
          <Navbar />
          <Home/>
          <Login/>
          <Register/>
          {/* <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/tourist/*" 
                element={
                  <ProtectedRoute userType="tourist">
                    <TouristPortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute userType="admin">
                    <AdminPortal />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main> */}
          <Footer /> 
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
