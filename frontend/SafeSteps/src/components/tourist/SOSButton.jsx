import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, Shield, User, CheckCircle, Zap, Navigation } from 'lucide-react';

const SOSButton = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [emergencyType, setEmergencyType] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [alertSent, setAlertSent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const countdownRef = useRef(null);
  const pulseRef = useRef(null);

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', icon: '🏥', color: 'bg-red-500' },
    { id: 'safety', label: 'Safety Threat', icon: '⚠️', color: 'bg-orange-500' },
    { id: 'lost', label: 'Lost/Confused', icon: '🗺️', color: 'bg-yellow-500' },
    { id: 'accident', label: 'Accident', icon: '🚨', color: 'bg-purple-500' },
    { id: 'harassment', label: 'Harassment', icon: '🛡️', color: 'bg-pink-500' },
    { id: 'other', label: 'Other Emergency', icon: '⚡', color: 'bg-gray-500' }
  ];

  useEffect(() => {
    // Get current location
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

    // Mock emergency contacts
    setEmergencyContacts([
      { id: 1, name: 'Tourist Police', phone: '+1-800-TOURIST', type: 'police' },
      { id: 2, name: 'Medical Emergency', phone: '+1-911', type: 'medical' },
      { id: 3, name: 'Embassy Hotline', phone: '+1-800-EMBASSY', type: 'embassy' },
      { id: 4, name: 'Personal Contact', phone: '+1-555-FAMILY', type: 'personal' }
    ]);
  }, []);

  useEffect(() => {
    if (isSOSActive && countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isSOSActive && countdown === 0) {
      triggerEmergencyAlert();
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [isSOSActive, countdown]);

  const startSOSCountdown = () => {
    if (!emergencyType) {
      alert('Please select an emergency type first.');
      return;
    }
    
    setIsSOSActive(true);
    setCountdown(5);
    setShowConfirmation(false);
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    setCountdown(5);
    if (countdownRef.current) {
      clearTimeout(countdownRef.current);
    }
  };

  const triggerEmergencyAlert = () => {
    setIsSOSActive(false);
    setAlertSent(true);
    setShowConfirmation(true);

    // Simulate sending alerts to all emergency contacts
    const alertData = {
      type: emergencyType,
      location: currentLocation,
      timestamp: new Date().toISOString(),
      additionalInfo: additionalInfo,
      touristId: 'TID-2025-001'
    };

    console.log('Emergency Alert Sent:', alertData);

    // Reset after showing confirmation
    setTimeout(() => {
      setAlertSent(false);
      setShowConfirmation(false);
      setEmergencyType('');
      setAdditionalInfo('');
    }, 10000);
  };

  const quickCall = (contact) => {
    window.location.href = `tel:${contact.phone}`;
  };

  const getEmergencyTypeData = () => {
    return emergencyTypes.find(type => type.id === emergencyType) || emergencyTypes[0];
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Alert Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your emergency alert has been sent to all relevant authorities and emergency contacts. 
            Help is on the way.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-600 space-y-2">
              <div>Alert Type: <span className="font-semibold">{getEmergencyTypeData().label}</span></div>
              <div>Time Sent: <span className="font-semibold">{new Date().toLocaleTimeString()}</span></div>
              <div>Location: <span className="font-semibold">GPS Coordinates Shared</span></div>
            </div>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = 'tel:911'}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Call 911 Now
            </button>
            <button 
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                Emergency SOS
              </h1>
              <p className="text-gray-600">Quick access to emergency services and alerts</p>
            </div>
            <div className="text-right">
              <div className="bg-red-100 px-4 py-2 rounded-full">
                <span className="text-red-800 font-semibold">Emergency Mode</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main SOS Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Type Selection */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select Emergency Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emergencyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEmergencyType(type.id)}
                    className={`p-4 rounded-xl border-2 transition ${
                      emergencyType === type.id
                        ? `${type.color} text-white border-transparent`
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Information (Optional)</h2>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Describe your emergency situation, injuries, number of people involved, etc."
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            {/* SOS Button */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center">
                {!isSOSActive ? (
                  <div>
                    <button
                      onClick={startSOSCountdown}
                      className={`w-48 h-48 rounded-full font-bold text-2xl text-white transition transform hover:scale-105 active:scale-95 shadow-2xl ${
                        emergencyType ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!emergencyType}
                    >
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="w-16 h-16 mb-2" />
                        <span>SOS</span>
                        <span className="text-sm font-normal">EMERGENCY</span>
                      </div>
                    </button>
                    <p className="text-gray-600 mt-4 text-sm">
                      Press and hold to send emergency alert
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-red-600 flex items-center justify-center mx-auto animate-pulse">
                        <div className="text-center text-white">
                          <div className="text-6xl font-bold mb-2">{countdown}</div>
                          <div className="text-sm">SENDING ALERT</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-full border-8 border-red-300 animate-ping"></div>
                    </div>
                    <button
                      onClick={cancelSOS}
                      className="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition"
                    >
                      Cancel Alert
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Location */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-red-600 mr-2" />
                Your Location
              </h3>
              {currentLocation.lat ? (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                    <div className="text-green-800 text-sm">
                      <div>Lat: {currentLocation.lat.toFixed(6)}</div>
                      <div>Lng: {currentLocation.lng.toFixed(6)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center">
                    <Navigation className="w-4 h-4 mr-1" />
                    Location will be shared with emergency services
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
                  <p className="text-gray-500 text-sm mt-2">Getting location...</p>
                </div>
              )}
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 text-red-600 mr-2" />
                Quick Call
              </h3>
              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => quickCall(contact)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition flex items-center space-x-3"
                  >
                    <div className="bg-red-100 p-2 rounded-full">
                      <Phone className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{contact.name}</div>
                      <div className="text-sm text-gray-600">{contact.phone}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 text-red-600 mr-2" />
                Safety Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>Stay calm and find a safe location if possible</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>Keep your phone charged and location services on</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>Follow local emergency procedures</div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>Contact embassy if you're a foreign tourist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSButton;