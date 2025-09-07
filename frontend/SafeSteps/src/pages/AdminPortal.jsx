import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashBoard';
import RealTimeMonitor from '../components/admin/RealTimeMonitor';
import IncidentManager from '../components/admin/IncidentManager';
import TouristTracker from '../components/admin/TouristTracker';

const AdminPortal = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemStats, setSystemStats] = useState({
    totalTourists: 1247,
    activeTourists: 892,
    totalIncidents: 23,
    activeIncidents: 3,
    safeZoneViolations: 7,
    emergencyAlerts: 2
  });

  useEffect(() => {
    // Set active tab based on current route
    const path = location.pathname.split('/')[2] || 'dashboard';
    setActiveTab(path);
  }, [location]);

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )
    },
    {
      id: 'monitor',
      name: 'Live Monitor',
      path: '/admin/monitor',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'incidents',
      name: 'Incidents',
      path: '/admin/incidents',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'tracker',
      name: 'Tourist Tracker',
      path: '/admin/tracker',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const alertItems = [
    {
      id: 1,
      type: 'emergency',
      title: 'SOS Alert - Tourist in Distress',
      location: 'Marina Bay, Singapore',
      time: '2 minutes ago',
      severity: 'high',
      touristId: 'TID-2025-0047'
    },
    {
      id: 2,
      type: 'violation',
      title: 'Safe Zone Violation',
      location: 'Restricted Area - Zone 7',
      time: '8 minutes ago',
      severity: 'medium',
      touristId: 'TID-2025-0089'
    },
    {
      id: 3,
      type: 'medical',
      title: 'Medical Alert Triggered',
      location: 'Central Park Area',
      time: '15 minutes ago',
      severity: 'high',
      touristId: 'TID-2025-0123'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      case 'violation':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'medical':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">
      {/* Admin Portal Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Admin Control Center
                </h1>
                <p className="text-cyan-100 mt-1">
                  Welcome, <span className="font-semibold">{user?.name}</span> • Real-time Tourist Safety Management
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{systemStats.activeTourists}</div>
                  <div className="text-xs text-cyan-100">Active Tourists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{systemStats.activeIncidents}</div>
                  <div className="text-xs text-cyan-100">Active Incidents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{systemStats.emergencyAlerts}</div>
                  <div className="text-xs text-cyan-100">Emergency Alerts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">System Status: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600">Blockchain Network: Secure</span>
              </div>
            </div>
            
            {/* Current Time */}
            <div className="text-sm text-gray-600">
              Last Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === item.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {(item.id === 'incidents' && systemStats.activeIncidents > 0) && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                    {systemStats.activeIncidents}
                  </span>
                )}
                {(item.id === 'monitor' && systemStats.emergencyAlerts > 0) && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                    {systemStats.emergencyAlerts}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="monitor" element={<RealTimeMonitor />} />
            <Route path="incidents" element={<IncidentManager />} />
            <Route path="tracker" element={<TouristTracker />} />
          </Routes>
        </main>

        {/* Real-time Alerts Sidebar */}
        <aside className="w-80 bg-white shadow-lg border-l border-gray-200 p-6">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>Live Alerts</span>
              </h3>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                View All
              </button>
            </div>

            {/* Alert Items */}
            <div className="space-y-4">
              {alertItems.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getAlertIcon(alert.type)}
                      <span className="font-medium text-sm">{alert.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{alert.touristId}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 bg-teal-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-teal-700 transition">
                      Respond
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition text-sm font-medium">
                  Emergency Broadcast
                </button>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition text-sm font-medium">
                  Update Safe Zones
                </button>
                <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition text-sm font-medium">
                  Generate Report
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="mt-8">
              <h4 className="text-md font-semibold text-gray-900 mb-4">System Health</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">API Status</span>
                  <span className="text-green-600 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Blockchain Network</span>
                  <span className="text-green-600 font-medium">Synced</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">GPS Tracking</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Emergency Services</span>
                  <span className="text-green-600 font-medium">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminPortal;