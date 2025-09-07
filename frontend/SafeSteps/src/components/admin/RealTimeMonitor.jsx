import React, { useState, useEffect } from 'react';

const RealTimeMonitor = () => {
  const [filters, setFilters] = useState({
    showTourists: true,
    showIncidents: true,
    showSafeZones: true,
    showPatrols: true,
    timeRange: 'live'
  });
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [mapCenter] = useState({ lat: 1.3521, lng: 103.8198 }); // Singapore

  // Mock real-time tourist data
  const [tourists, setTourists] = useState([
    {
      id: 'TID-2025-0047',
      name: 'John Smith',
      position: { lat: 1.3521, lng: 103.8198 },
      status: 'safe',
      lastUpdate: new Date().toISOString(),
      battery: 85,
      isInSafeZone: true,
      digitalIdVerified: true,
      phoneNumber: '+65-9123-4567'
    },
    {
      id: 'TID-2025-0089',
      name: 'Maria Garcia',
      position: { lat: 1.3441, lng: 103.8266 },
      status: 'alert',
      lastUpdate: new Date().toISOString(),
      battery: 42,
      isInSafeZone: false,
      digitalIdVerified: true,
      phoneNumber: '+65-9234-5678'
    },
    {
      id: 'TID-2025-0123',
      name: 'Ahmed Hassan',
      position: { lat: 1.3621, lng: 103.8118 },
      status: 'emergency',
      lastUpdate: new Date().toISOString(),
      battery: 67,
      isInSafeZone: true,
      digitalIdVerified: true,
      phoneNumber: '+65-9345-6789'
    },
    {
      id: 'TID-2025-0156',
      name: 'Lisa Chen',
      position: { lat: 1.3481, lng: 103.8328 },
      status: 'safe',
      lastUpdate: new Date().toISOString(),
      battery: 91,
      isInSafeZone: true,
      digitalIdVerified: false,
      phoneNumber: '+65-9456-7890'
    }
  ]);

  // Mock safe zones data
    // Mock safe zones data
  const safeZones = [
    {
      id: 'sz-001',
      name: 'MG Marg Tourist Zone',
      center: { lat: 1.3521, lng: 103.8198 },
      radius: 500,
      color: '#10B981',
      touristsInside: 156
    },
    {
      id: 'sz-002',
      name: 'Rumtek Monastery Area',
      center: { lat: 1.3048, lng: 103.8318 },
      radius: 400,
      color: '#06B6D4',
      touristsInside: 89
    },
    {
      id: 'sz-003',
      name: 'Tsomgo Lake Zone',
      center: { lat: 1.2494, lng: 103.8303 },
      radius: 800,
      color: '#8B5CF6',
      touristsInside: 234
    }
  ];


  // Mock incidents data
  const [incidents, setIncidents] = useState([
    {
      id: 'inc-001',
      type: 'emergency',
      position: { lat: 1.3621, lng: 103.8118 },
      touristId: 'TID-2025-0123',
      timestamp: new Date().toISOString(),
      status: 'active',
      description: 'Medical emergency - chest pain reported'
    },
    {
      id: 'inc-002',
      type: 'violation',
      position: { lat: 1.3441, lng: 103.8266 },
      touristId: 'TID-2025-0089',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'investigating',
      description: 'Safe zone boundary violation'
    }
  ]);

  // Mock patrol units
  const patrolUnits = [
    {
      id: 'patrol-001',
      name: 'Unit Alpha',
      position: { lat: 1.3521, lng: 103.8298 },
      status: 'available',
      assignedIncident: null
    },
    {
      id: 'patrol-002',
      name: 'Unit Bravo',
      position: { lat: 1.3621, lng: 103.8118 },
      status: 'responding',
      assignedIncident: 'inc-001'
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setTourists(prev => prev.map(tourist => ({
        ...tourist,
        position: {
          lat: tourist.position.lat + (Math.random() - 0.5) * 0.001,
          lng: tourist.position.lng + (Math.random() - 0.5) * 0.001
        },
        lastUpdate: new Date().toISOString(),
        battery: Math.max(0, tourist.battery - Math.random() * 2)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const handleTouristClick = (tourist) => {
    setSelectedTourist(tourist);
  };

  const handleEmergencyResponse = (incidentId) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { ...inc, status: 'responding' }
        : inc
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'alert': return 'text-yellow-600 bg-yellow-100';
      case 'emergency': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe':
        return (
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
        );
      case 'alert':
        return (
          <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        );
      case 'emergency':
        return (
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-ping"></div>
        );
      default:
        return (
          <div className="w-4 h-4 bg-gray-500 rounded-full border-2 border-white shadow-lg"></div>
        );
    }
  };

  const renderSimulatedMap = () => {
    return (
      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#14B8A6" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Title */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg px-3 py-2 shadow-lg">
          <h4 className="font-semibold text-gray-800">Sikkim Tourist Monitoring</h4>
          <p className="text-sm text-gray-600">Live Tracking Active • High Altitude Zone</p>
        </div>

        {/* Safe Zones */}
        {filters.showSafeZones && safeZones.map((zone, index) => (
          <div
            key={zone.id}
            className="absolute rounded-full border-2 border-opacity-50 bg-opacity-10"
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 15}%`,
              width: `${120 + index * 20}px`,
              height: `${120 + index * 20}px`,
              borderColor: zone.color,
              backgroundColor: zone.color,
            }}
          >
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded px-2 py-1 text-xs font-medium text-gray-700 whitespace-nowrap">
              {zone.name}
            </div>
          </div>
        ))}

        {/* Tourists */}
        {filters.showTourists && tourists.map((tourist, index) => (
          <div
            key={tourist.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${25 + index * 20}%`,
              top: `${35 + index * 15}%`,
            }}
            onClick={() => handleTouristClick(tourist)}
          >
            {getStatusIcon(tourist.status)}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              <div className="font-medium">{tourist.name}</div>
              <div>Status: {tourist.status}</div>
              <div>Battery: {Math.round(tourist.battery)}%</div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        ))}

        {/* Incidents */}
        {filters.showIncidents && incidents.map((incident, index) => (
          <div
            key={incident.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${40 + index * 25}%`,
              top: `${45 + index * 20}%`,
            }}
          >
            <div className="w-6 h-6 bg-red-500 rounded-sm border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            
            {/* Incident Info */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-red-500 text-white text-xs rounded whitespace-nowrap">
              {incident.type === 'emergency' ? 'Emergency' : 'Violation'}
            </div>
          </div>
        ))}

        {/* Patrol Units */}
        {filters.showPatrols && patrolUnits.map((unit, index) => (
          <div
            key={unit.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${60 + index * 15}%`,
              top: `${25 + index * 30}%`,
            }}
          >
            <div className="w-6 h-6 bg-gray-800 rounded border-2 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            
            {/* Patrol Info */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
              {unit.name} - {unit.status}
            </div>
          </div>
        ))}

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
          <h5 className="font-semibold text-gray-800 mb-2 text-sm">Legend</h5>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Safe Tourist</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Alert Tourist</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Emergency</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span>Incident</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-800 rounded"></div>
              <span>Patrol Unit</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Monitor Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-Time Monitor</span>
            </h2>
            <p className="text-gray-600">Live tracking of tourist locations, incidents, and safety zones</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isLiveMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {isLiveMode ? 'Live Mode' : 'Paused'}
            </button>
            <select 
              value={filters.timeRange}
              onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="live">Live</option>
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Map Filters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showTourists}
              onChange={(e) => setFilters({...filters, showTourists: e.target.checked})}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
            />
            <span className="text-gray-700">Show Tourists</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showIncidents}
              onChange={(e) => setFilters({...filters, showIncidents: e.target.checked})}
              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <span className="text-gray-700">Show Incidents</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showSafeZones}
              onChange={(e) => setFilters({...filters, showSafeZones: e.target.checked})}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-gray-700">Show Safe Zones</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showPatrols}
              onChange={(e) => setFilters({...filters, showPatrols: e.target.checked})}
              className="w-4 h-4 text-gray-600 rounded focus:ring-gray-500"
            />
            <span className="text-gray-700">Show Patrols</span>
          </label>
        </div>
      </div>

      {/* Main Monitor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Live Map View</h3>
          </div>
          {renderSimulatedMap()}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Live Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Tourists</span>
                <span className="text-2xl font-bold text-green-600">{tourists.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Incidents</span>
                <span className="text-2xl font-bold text-red-600">
                  {incidents.filter(inc => inc.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Safe Zone Violations</span>
                <span className="text-2xl font-bold text-yellow-600">
                  {tourists.filter(t => !t.isInSafeZone).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Available Patrols</span>
                <span className="text-2xl font-bold text-blue-600">
                  {patrolUnits.filter(p => p.status === 'available').length}
                </span>
              </div>
            </div>
          </div>

          {/* Tourist Details */}
          {selectedTourist && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tourist Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Name:</span>
                  <p className="text-gray-900">{selectedTourist.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">ID:</span>
                  <p className="text-gray-900 font-mono text-sm">{selectedTourist.id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-900">{selectedTourist.phoneNumber}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTourist.status)}`}>
                    {selectedTourist.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Battery:</span>
                  <p className={`${getBatteryColor(selectedTourist.battery)} font-medium`}>
                    {Math.round(selectedTourist.battery)}%
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Digital ID:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    selectedTourist.digitalIdVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedTourist.digitalIdVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Last Update:</span>
                  <p className="text-gray-900 text-sm">
                    {new Date(selectedTourist.lastUpdate).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
                  Send Message
                </button>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  Mark as Emergency
                </button>
              </div>
            </div>
          )}

          {/* Incident List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Incidents</h3>
            <div className="space-y-3">
              {incidents.map(incident => (
                <div key={incident.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {incident.type === 'emergency' ? 'Emergency Alert' : 'Zone Violation'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      incident.status === 'active' ? 'bg-red-100 text-red-800' : 
                      incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                  <p className="text-xs text-gray-500 mb-3">Tourist: {incident.touristId}</p>
                  <button
                    onClick={() => handleEmergencyResponse(incident.id)}
                    className="w-full bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                  >
                    Dispatch Response
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition">
                Emergency Broadcast
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition">
                Update Safe Zones
              </button>
              <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition">
                Export Current Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;