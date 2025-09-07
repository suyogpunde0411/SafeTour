import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, AlertTriangle, Clock, Phone, User, Navigation, Heart, Bell } from 'lucide-react';

const TouristDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [safetyStatus, setSafetyStatus] = useState('safe');
  const [incidents, setIncidents] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Tourist Police', phone: '+1-800-TOURIST', type: 'police' },
    { name: 'Medical Emergency', phone: '+1-800-MEDICAL', type: 'medical' },
    { name: 'Embassy', phone: '+1-800-EMBASSY', type: 'embassy' }
  ]);

  // Mock user data
  const user = {
    name: 'John Traveler',
    id: 'TID-2025-001',
    checkInTime: '2025-09-07T08:30:00',
    lastUpdate: new Date().toISOString()
  };

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Mock incidents data
    setIncidents([
      {
        id: 1,
        type: 'info',
        message: 'Welcome to SafeTour! Your digital ID is verified.',
        time: '2025-09-07T08:30:00',
        status: 'resolved'
      },
      {
        id: 2,
        type: 'warning',
        message: 'High tourist traffic detected in Central Market area.',
        time: '2025-09-07T10:15:00',
        status: 'active'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'danger': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'danger': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Tourist Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor(safetyStatus)}`}>
                <Shield className="w-5 h-5" />
                <span className="font-semibold capitalize">{safetyStatus}</span>
              </div>
              <div className="text-sm text-gray-500">
                <div>ID: {user.id}</div>
                <div>Last Update: {new Date(user.lastUpdate).toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link 
            to="/tourist/sos" 
            className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center"
          >
            <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-bold text-lg">SOS Emergency</h3>
            <p className="text-red-100 text-sm">Immediate Help</p>
          </Link>

          <Link 
            to="/tourist/map" 
            className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center"
          >
            <MapPin className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Live Map</h3>
            <p className="text-cyan-100 text-sm">View Safe Zones</p>
          </Link>

          <Link 
            to="/tourist/places" 
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center"
          >
            <Navigation className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Places Guide</h3>
            <p className="text-purple-100 text-sm">Explore Safely</p>
          </Link>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center">
            <Heart className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Health Status</h3>
            <p className="text-green-100 text-sm">All Good</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Location */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-6 h-6 text-teal-600 mr-2" />
              Current Location
            </h2>
            <div className="space-y-3">
              {currentLocation.lat ? (
                <>
                  <div className="bg-teal-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Latitude:</span>
                      <span className="font-mono text-sm">{currentLocation.lat.toFixed(6)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">Longitude:</span>
                      <span className="font-mono text-sm">{currentLocation.lng.toFixed(6)}</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">You are in a safe zone</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Getting your location...</p>
                </div>
              )}
              
              <Link 
                to="/tourist/map"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl font-semibold transition text-center block"
              >
                View on Map
              </Link>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Clock className="w-6 h-6 text-teal-600 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {incidents.map((incident) => (
                <div key={incident.id} className="border-l-4 border-teal-200 pl-4 py-2">
                  <div className="flex items-start space-x-3">
                    {getIncidentIcon(incident.type)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{incident.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(incident.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {incidents.length === 0 && (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Phone className="w-6 h-6 text-teal-600 mr-2" />
              Emergency Contacts
            </h2>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-teal-600 hover:text-teal-800 font-mono text-sm"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/tourist/sos"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition text-center block mt-4"
            >
              Emergency SOS
            </Link>
          </div>
        </div>

        {/* Digital ID Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <User className="w-6 h-6 text-teal-600 mr-2" />
            Digital Tourist ID
          </h2>
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">{user.name}</h3>
                <p className="text-cyan-100">Tourist ID: {user.id}</p>
                <p className="text-cyan-100 text-sm">Check-in: {new Date(user.checkInTime).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="bg-white bg-opacity-20 rounded-full p-3 mb-2">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
                  VERIFIED
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-400">
              <p className="text-cyan-100 text-sm">
                🔒 Blockchain Verified • 🛡️ Secure • 📍 GPS Tracked
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;