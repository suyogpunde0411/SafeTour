import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Shield, AlertTriangle, Navigation, Phone, Users, Clock, Zap } from 'lucide-react';

const MapView = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [safeZones, setSafeZones] = useState([]);
  const [nearbyTourists, setNearbyTourists] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  // Mock data for safe zones
  const mockSafeZones = [
    { id: 1, name: 'Tourist Police Station', lat: 40.7580, lng: -73.9855, type: 'police', radius: 500 },
    { id: 2, name: 'Central Hospital', lat: 40.7614, lng: -73.9776, type: 'hospital', radius: 300 },
    { id: 3, name: 'Tourist Information Center', lat: 40.7505, lng: -73.9934, type: 'info', radius: 200 },
    { id: 4, name: 'Safe Zone - Times Square', lat: 40.7589, lng: -73.9851, type: 'safe', radius: 400 },
    { id: 5, name: 'Embassy District', lat: 40.7614, lng: -73.9776, type: 'embassy', radius: 600 }
  ];

  // Mock nearby tourists
  const mockTourists = [
    { id: 'T001', name: 'Alice Johnson', lat: 40.7589, lng: -73.9851, status: 'safe', lastUpdate: '2 min ago' },
    { id: 'T002', name: 'Bob Smith', lat: 40.7505, lng: -73.9934, status: 'safe', lastUpdate: '5 min ago' },
    { id: 'T003', name: 'Carol Wilson', lat: 40.7614, lng: -73.9776, status: 'warning', lastUpdate: '1 min ago' }
  ];

  // Mock incidents
  const mockIncidents = [
    { id: 'I001', type: 'warning', lat: 40.7500, lng: -73.9900, description: 'Heavy traffic reported', time: '10 min ago' },
    { id: 'I002', type: 'info', lat: 40.7600, lng: -73.9800, description: 'Tourist event in progress', time: '15 min ago' }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation && trackingEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Set mock data
    setSafeZones(mockSafeZones);
    setNearbyTourists(mockTourists);
    setIncidents(mockIncidents);
  }, [trackingEnabled]);

  const getZoneColor = (type) => {
    switch (type) {
      case 'police': return 'bg-blue-500';
      case 'hospital': return 'bg-red-500';
      case 'info': return 'bg-green-500';
      case 'safe': return 'bg-teal-500';
      case 'embassy': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getZoneIcon = (type) => {
    switch (type) {
      case 'police': return <Shield className="w-4 h-4" />;
      case 'hospital': return <Phone className="w-4 h-4" />;
      case 'info': return <Navigation className="w-4 h-4" />;
      case 'safe': return <Shield className="w-4 h-4" />;
      case 'embassy': return <Users className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const handleSOSClick = () => {
    alert('SOS Alert Sent! Emergency services have been notified of your location.');
  };

  const MapMarker = ({ lat, lng, type, children, onClick }) => {
    const style = {
      position: 'absolute',
      left: `${((lng + 74.0060) / 0.05) * 100}%`,
      top: `${((40.7800 - lat) / 0.05) * 100}%`,
      transform: 'translate(-50%, -100%)',
      cursor: 'pointer'
    };

    return (
      <div style={style} onClick={onClick}>
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <MapPin className="w-8 h-8 text-teal-600 mr-3" />
                Live Safety Map
              </h1>
              <p className="text-gray-600">Real-time location tracking and safe zone monitoring</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={trackingEnabled}
                  onChange={(e) => setTrackingEnabled(e.target.checked)}
                  className="rounded text-teal-600"
                />
                <span className="text-sm text-gray-700">Live Tracking</span>
              </label>
              <button
                onClick={handleSOSClick}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold flex items-center space-x-2 transition"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>SOS</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Map Container */}
              <div 
                ref={mapRef}
                className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-green-100 to-blue-100"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(34, 197, 94, 0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(34, 197, 94, 0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(34, 197, 94, 0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(34, 197, 94, 0.1) 75%)
                  `,
                  backgroundSize: '20px 20px'
                }}
              >
                {/* User Location */}
                <MapMarker lat={userLocation.lat} lng={userLocation.lng} type="user">
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg"></div>
                    <div className="absolute -inset-2 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      You are here
                    </div>
                  </div>
                </MapMarker>

                {/* Safe Zones */}
                {safeZones.map((zone) => (
                  <MapMarker 
                    key={zone.id} 
                    lat={zone.lat} 
                    lng={zone.lng} 
                    type="zone"
                    onClick={() => setSelectedLocation(zone)}
                  >
                    <div className="relative">
                      <div className={`w-6 h-6 ${getZoneColor(zone.type)} text-white rounded-full flex items-center justify-center shadow-lg`}>
                        {getZoneIcon(zone.type)}
                      </div>
                      <div className={`absolute -inset-4 ${getZoneColor(zone.type)} rounded-full opacity-20`}></div>
                    </div>
                  </MapMarker>
                ))}

                {/* Other Tourists */}
                {nearbyTourists.map((tourist) => (
                  <MapMarker 
                    key={tourist.id} 
                    lat={tourist.lat} 
                    lng={tourist.lng} 
                    type="tourist"
                    onClick={() => setSelectedLocation(tourist)}
                  >
                    <div className="relative">
                      <div className={`w-3 h-3 ${tourist.status === 'safe' ? 'bg-green-500' : 'bg-yellow-500'} border border-white rounded-full`}></div>
                    </div>
                  </MapMarker>
                ))}

                {/* Incidents */}
                {incidents.map((incident) => (
                  <MapMarker 
                    key={incident.id} 
                    lat={incident.lat} 
                    lng={incident.lng} 
                    type="incident"
                    onClick={() => setSelectedLocation(incident)}
                  >
                    <div className="relative">
                      <AlertTriangle className={`w-5 h-5 ${incident.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                    </div>
                  </MapMarker>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>Your Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                      <span>Safe Zones</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Other Tourists</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      <span>Incidents</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex flex-wrap gap-3">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2">
                    <Navigation className="w-4 h-4" />
                    <span>Center on Me</span>
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Show Safe Routes</span>
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Find Nearby Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Info */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-teal-600 mr-2" />
                Current Status
              </h3>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">In Safe Zone</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">You are within a monitored area</p>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Lat: {userLocation.lat.toFixed(6)}</div>
                  <div>Lng: {userLocation.lng.toFixed(6)}</div>
                  <div className="flex items-center mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Safe Zones */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 text-teal-600 mr-2" />
                Nearby Safe Zones
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {safeZones.slice(0, 4).map((zone) => (
                  <div key={zone.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`p-2 ${getZoneColor(zone.type)} text-white rounded-lg`}>
                      {getZoneIcon(zone.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">{zone.name}</h4>
                      <p className="text-xs text-gray-600">{zone.radius}m radius</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 text-teal-600 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleSOSClick}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>Emergency SOS</span>
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Tourist Police</span>
                </button>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            {/* Selected Location Info */}
            {selectedLocation && (
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Location Details</h3>
                <div className="space-y-3">
                  <h4 className="font-semibold">{selectedLocation.name || selectedLocation.description}</h4>
                  {selectedLocation.type && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${getZoneColor(selectedLocation.type)}`}>
                      {selectedLocation.type.toUpperCase()}
                    </span>
                  )}
                  {selectedLocation.radius && (
                    <p className="text-sm text-gray-600">Coverage: {selectedLocation.radius}m radius</p>
                  )}
                  {selectedLocation.status && (
                    <p className="text-sm text-gray-600">Status: {selectedLocation.status}</p>
                  )}
                  {selectedLocation.time && (
                    <p className="text-sm text-gray-600">Time: {selectedLocation.time}</p>
                  )}
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="mt-3 text-sm text-teal-600 hover:text-teal-800"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl font-bold text-teal-600 mb-2">{safeZones.length}</div>
            <div className="text-sm text-gray-600">Safe Zones Nearby</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{nearbyTourists.length}</div>
            <div className="text-sm text-gray-600">Nearby Tourists</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Monitoring Active</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">2.5km</div>
            <div className="text-sm text-gray-600">Safe Zone Coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;