import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About SafeTour</h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Revolutionizing tourist safety through cutting-edge technology, 
              ensuring every journey is secure and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our <span className="text-teal-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                SafeTour was born from a critical need to address tourist safety challenges 
                in India's diverse and remote destinations. With tourism being a key economic 
                driver, especially in regions like Northeast India, we recognized that 
                traditional safety measures were insufficient.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our mission is to leverage advanced technologies including AI, blockchain, 
                and IoT to create a comprehensive safety ecosystem that protects tourists 
                while enabling them to explore with confidence.
              </p>
              <div className="flex space-x-4">
                <Link 
                  to="/services"
                  className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition"
                >
                  Our Services
                </Link>
                <Link 
                  to="/contact"
                  className="border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-full hover:bg-teal-600 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-center">
                  <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">100% Secure</h3>
                  <p className="text-gray-600">
                    Blockchain-powered digital IDs and end-to-end encrypted communications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Addressing Critical <span className="text-teal-600">Safety Challenges</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Developed in collaboration with the Ministry of Development of North Eastern Region, 
              Ministry of Tourism, and Ministry of Home Affairs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                ),
                title: "Remote Area Safety",
                description: "Traditional policing methods insufficient in remote and high-risk tourism destinations"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                ),
                title: "Manual Tracking Limitations",
                description: "Manual tourist tracking methods are slow and ineffective for rapid emergency response"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"/>
                  </svg>
                ),
                title: "Identity Verification",
                description: "Need for secure, tamper-proof tourist identity verification and travel documentation"
              }
            ].map((challenge, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="bg-red-100 text-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {challenge.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{challenge.title}</h3>
                <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Powered by <span className="text-teal-600">Advanced Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive solution integrates multiple cutting-edge technologies 
              to ensure maximum safety and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🔗",
                title: "Blockchain Security",
                description: "Tamper-proof digital identity and secure transaction records"
              },
              {
                icon: "🤖",
                title: "AI & Machine Learning",
                description: "Intelligent anomaly detection and predictive safety analytics"
              },
              {
                icon: "🌐",
                title: "IoT Integration",
                description: "Smart wearables and sensor networks for comprehensive monitoring"
              },
              {
                icon: "📡",
                title: "Real-time Geo-fencing",
                description: "Advanced location tracking with intelligent boundary detection"
              }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{tech.title}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Complete Safety Ecosystem</h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              From digital ID generation to emergency response, we cover every aspect of tourist safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Blockchain-based Digital Tourist IDs",
              "AI-powered Anomaly Detection",
              "Real-time Geo-fencing Alerts",
              "One-click SOS Emergency System",
              "Multilingual Support (10+ Languages)",
              "IoT Wearable Integration",
              "Automated E-FIR Generation",
              "Tourism Department Dashboard",
              "End-to-end Data Encryption"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-cyan-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Collaboration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Government <span className="text-teal-600">Collaboration</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Developed in partnership with key government ministries and organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ministry of Development of North Eastern Region",
                description: "Primary sponsoring organization focusing on Northeast India tourism development"
              },
              {
                title: "Ministry of Tourism & Ministry of Home Affairs",
                description: "Collaborative departments ensuring national tourism safety standards"
              },
              {
                title: "State Police Departments & NIC",
                description: "Implementation partners for ground-level safety and technical infrastructure"
              }
            ].map((partner, index) => (
              <div key={index} className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{partner.title}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-teal-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Tourist Safety?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the future of smart tourism with SafeTour's comprehensive safety ecosystem
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/register"
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link 
              to="/contact"
              className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-teal-600 hover:text-white transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;