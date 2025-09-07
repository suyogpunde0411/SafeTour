import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 'digital-id',
      title: 'Blockchain Digital Tourist ID',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
        </svg>
      ),
      description: 'Secure, tamper-proof digital identity system for all tourists',
      features: [
        'Blockchain-secured digital credentials',
        'KYC integration (Aadhaar/Passport)',
        'Trip itinerary and emergency contacts',
        'Valid only for visit duration',
        'QR code verification system',
        'Multi-language support'
      ],
      benefits: [
        'Instant identity verification',
        'Reduced paperwork and processing time',
        'Enhanced security against fraud',
        'Easy integration with existing systems'
      ]
    },
    {
      id: 'geo-fencing',
      title: 'Smart Geo-Fencing & Location Tracking',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
      ),
      description: 'Real-time location monitoring with intelligent boundary detection',
      features: [
        'Real-time GPS tracking with ±10m accuracy',
        'Smart geo-fence creation and management',
        'Automated alerts for zone violations',
        'Safe zone recommendations',
        'Historical location analytics',
        'Privacy-compliant tracking'
      ],
      benefits: [
        'Immediate alerts for unsafe areas',
        'Proactive safety management',
        'Detailed location history',
        'Customizable safety boundaries'
      ]
    },
    {
      id: 'emergency-response',
      title: 'SOS Emergency Response System',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
      ),
      description: 'One-click emergency alerts with rapid response coordination',
      features: [
        'One-touch SOS activation',
        'Automatic location sharing',
        'Multi-channel alert dispatch',
        'Emergency contact notification',
        'Real-time incident tracking',
        'Voice and text emergency access'
      ],
      benefits: [
        'Instant emergency response',
        'Automated incident documentation',
        'Multi-language emergency support',
        'Integration with local emergency services'
      ]
    },
    {
      id: 'ai-monitoring',
      title: 'AI-Powered Anomaly Detection',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/>
        </svg>
      ),
      description: 'Machine learning algorithms for predictive safety analytics',
      features: [
        'Behavioral pattern analysis',
        'Sudden location drop-off detection',
        'Prolonged inactivity monitoring',
        'Route deviation alerts',
        'Predictive risk assessment',
        'Automated investigation triggers'
      ],
      benefits: [
        'Proactive threat detection',
        'Reduced false alarms',
        'Intelligent risk scoring',
        'Automated response recommendations'
      ]
    },
    {
      id: 'admin-dashboard',
      title: 'Real-Time Monitoring Dashboard',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
      ),
      description: 'Comprehensive control center for tourism authorities and police',
      features: [
        'Real-time tourist cluster visualization',
        'Heat maps of high-risk zones',
        'Digital ID records access',
        'Alert history and analytics',
        'Last known location tracking',
        'Automated E-FIR generation'
      ],
      benefits: [
        'Complete situational awareness',
        'Data-driven decision making',
        'Streamlined incident management',
        'Enhanced coordination capabilities'
      ]
    }
    // {
    //   id: 'iot-integration',
    //   title: 'IoT Wearable Integration',
    //   icon: (
    //     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
    //       <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
    //     </svg>
    //   ),
    //   description: 'Smart wearable devices for enhanced safety in high-risk areas',
    //   features: [
    //     'Smart bands and safety tags',
    //     'Continuous health monitoring',
    //     'Location signal transmission',
    //     'Manual SOS activation',
    //     'Battery life optimization',
    //     'Weather-resistant design'
    //   ],
    //   benefits: [
    //     'Enhanced safety in remote areas',
    //     'Continuous monitoring capability',
    //     'Hands-free emergency activation',
    //     'Vital signs tracking'
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Comprehensive tourist safety solutions powered by cutting-edge technology. 
              From blockchain security to AI monitoring, we provide end-to-end protection.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Complete <span className="text-teal-600">Safety Ecosystem</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated platform combines multiple advanced technologies to create 
              a comprehensive tourist safety management system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                  activeService === index ? 'ring-4 ring-teal-500 ring-opacity-50' : ''
                }`}
                onClick={() => setActiveService(index)}
              >
                <div className="bg-teal-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center text-teal-600 font-semibold">

                  {/* <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20"> */}
                    {/* <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/> */}
                  {/* </svg> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service View */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Service Details */}
              <div className="p-12">
                <div className="flex items-center mb-6">
                  <div className="bg-teal-500 text-white w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                    {services[activeService].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{services[activeService].title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {services[activeService].description}
                </p>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {services[activeService].features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="bg-teal-100 text-teal-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Benefits</h4>
                  <ul className="space-y-3">
                    {services[activeService].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <div className="bg-cyan-100 text-cyan-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual/Demo Area */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-12 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="bg-white bg-opacity-20 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl">
                      {activeService === 0 && (
                        <div className="text-center">
                          <div className="bg-teal-600 w-20 h-32 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-800">Digital Tourist ID</h4>
                          <p className="text-sm text-gray-600 mt-2">Blockchain Secured • Tamper Proof</p>
                        </div>
                      )}
                      
                      {activeService === 1 && (
                        <div className="text-center">
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <div className="absolute inset-0 bg-teal-600 rounded-full"></div>
                            <div className="absolute inset-2 bg-teal-400 rounded-full animate-pulse"></div>
                            <div className="absolute inset-4 bg-teal-200 rounded-full animate-ping"></div>
                            <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                          <h4 className="font-bold text-gray-800">Live Tracking</h4>
                          <p className="text-sm text-gray-600 mt-2">Real-time • Geo-fenced</p>
                        </div>
                      )}

                      {activeService === 2 && (
                        <div className="text-center">
                          <div className="bg-red-500 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                            <span className="text-white font-bold text-2xl">SOS</span>
                          </div>
                          <h4 className="font-bold text-gray-800">Emergency Alert</h4>
                          <p className="text-sm text-gray-600 mt-2">One-click • Instant Response</p>
                        </div>
                      )}

                      {activeService === 3 && (
                        <div className="text-center">
                          <div className="bg-purple-600 w-20 h-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-800">AI Monitoring</h4>
                          <p className="text-sm text-gray-600 mt-2">Smart • Predictive</p>
                        </div>
                      )}

                      {activeService === 4 && (
                        <div className="text-center">
                          <div className="bg-blue-600 w-24 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
                              <path d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"/>
                              <path d="M14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-800">Control Dashboard</h4>
                          <p className="text-sm text-gray-600 mt-2">Real-time • Comprehensive</p>
                        </div>
                      )}

                      {activeService === 5 && (
                        <div className="text-center">
                          <div className="bg-green-600 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-800">Smart Wearable</h4>
                          <p className="text-sm text-gray-600 mt-2">IoT • Health Monitoring</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Implementation <span className="text-teal-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined deployment process ensures quick setup and seamless integration 
              with your existing tourism infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assessment & Planning",
                description: "Comprehensive analysis of your tourism infrastructure and safety requirements"
              },
              {
                step: "02", 
                title: "System Deployment",
                description: "Installation and configuration of SafeTour platform with customized settings"
              },
              {
                step: "03",
                title: "Training & Integration",
                description: "Staff training and integration with existing emergency response systems"
              },
              {
                step: "04",
                title: "Go Live & Support",
                description: "System activation with 24/7 monitoring and ongoing technical support"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-teal-100">
  <div className="max-w-4xl mx-auto text-center px-4">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Transform Tourist Safety?</h2>
    <p className="text-xl text-gray-600 mb-8">
      Join leading tourism authorities who trust SafeTour for comprehensive visitor protection
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
        Contact Sales
      </Link>
    </div>
  </div>
</section>
</div>
  );
};

export default Services;