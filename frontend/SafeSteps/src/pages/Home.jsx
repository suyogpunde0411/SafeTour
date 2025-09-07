import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Keep Your Travelers 
                <span className="text-cyan-200"> Safe & Secure!</span>
              </h1>
              <p className="text-xl mb-8 text-cyan-100">
                Advanced geo-fencing, blockchain-verified digital IDs, and real-time incident response 
                system for comprehensive tourist safety management.
              </p>
              <div className="flex space-x-4">
                <Link 
                  to="/register"
                  className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-cyan-50 transition transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white bg-opacity-20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Live Tracking</h3>
                      <p className="text-gray-600 text-sm">24/7 Safety Monitoring</p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">
                      "All tourists are within safe zones. Emergency response ready."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Comprehensive <span className="text-teal-600">Safety Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced system combines cutting-edge technology with intuitive design 
              to ensure maximum tourist safety and efficient incident management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                ),
                title: "Geo-Fencing Technology",
                description: "Real-time location tracking with smart boundary detection. Get instant alerts when tourists enter or exit designated safe zones."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z"/>
                  </svg>
                ),
                title: "Blockchain Digital ID",
                description: "Secure, tamper-proof digital identity verification system ensuring authentic tourist credentials and enhanced security."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                ),
                title: "SOS Emergency System",
                description: "One-click emergency alerts with automatic location sharing to authorities and emergency contacts for rapid response."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
                title: "Real-Time Dashboard",
                description: "Comprehensive monitoring dashboard for authorities to track all tourists, manage incidents, and coordinate responses."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                ),
                title: "Smart Notifications",
                description: "Intelligent alert system with customizable notifications for different user types and emergency scenarios."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                ),
                title: "Tourist Guide Integration",
                description: "Built-in local guide network with verified contacts, places to visit, and transportation information for better experiences."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="bg-teal-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-teal-100">
  <div className="max-w-4xl mx-auto text-center px-4">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Secure Your Tourism?</h2>
    <p className="text-xl text-gray-600 mb-8">
      Join thousands of tourism authorities who trust SafeTour for comprehensive visitor safety management.
    </p>
    <div className="flex justify-center space-x-4">
      <Link 
        to="/register"
        className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition transform hover:scale-105"
      >
        Get Started
      </Link>
      <Link 
        to="/contact"
        className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-teal-600 hover:text-white transition"
      >
        Contact Us
      </Link>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
