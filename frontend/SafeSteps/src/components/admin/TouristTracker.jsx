import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const TouristTracker = () => {
  const [tourists, setTourists] = useState([]);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
    idVerification: 'all',
    batteryLevel: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock tourist data for Sikkim with realistic details
  const mockTourists = [
    {
      id: 'TID-2025-0123',
      name: 'Rajesh Kumar',
      phone: '+91-9832-567890',
      email: 'rajesh.kumar@gmail.com',
      nationality: 'Indian',
      age: 28,
      gender: 'Male',
      registrationDate: new Date('2025-01-15'),
      lastActivity: new Date(Date.now() - 5 * 60 * 1000),
      currentLocation: {
        name: 'Nathula Pass',
        coordinates: { lat: 27.3748, lng: 88.7485 },
        altitude: 14140,
        district: 'East Sikkim'
      },
      status: 'emergency',
      batteryLevel: 67,
      digitalIdVerified: true,
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890',
      emergencyContact: {
        name: 'Priya Kumar',
        phone: '+91-9876-543210',
        relation: 'Wife'
      },
      visitHistory: [
        { location: 'Gangtok MG Marg', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { location: 'Rumtek Monastery', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { location: 'Tsomgo Lake', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) }
      ],
      safeZoneViolations: 1,
      totalIncidents: 2
    },
    {
      id: 'TID-2025-0089',
      name: 'Priya Sharma',
      phone: '+91-9733-456789',
      email: 'priya.sharma@yahoo.com',
      nationality: 'Indian',
      age: 24,
      gender: 'Female',
      registrationDate: new Date('2025-01-16'),
      lastActivity: new Date(Date.now() - 2 * 60 * 1000),
      currentLocation: {
        name: 'Restricted Border Zone, Nathu La',
        coordinates: { lat: 27.3901, lng: 88.8420 },
        altitude: 14200,
        district: 'East Sikkim'
      },
      status: 'alert',
      batteryLevel: 42,
      digitalIdVerified: true,
      blockchainHash: '0x2b3c4d5e6f7890abc1234567890abcdef',
      emergencyContact: {
        name: 'Amit Sharma',
        phone: '+91-9654-321098',
        relation: 'Father'
      },
      visitHistory: [
        { location: 'Nathu La Pass', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { location: 'Baba Mandir', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) }
      ],
      safeZoneViolations: 3,
      totalIncidents: 1
    },
    {
      id: 'TID-2025-0156',
      name: 'Michael Johnson',
      phone: '+1-555-123-4567',
      email: 'mjohnson@email.com',
      nationality: 'American',
      age: 35,
      gender: 'Male',
      registrationDate: new Date('2025-01-14'),
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      currentLocation: {
        name: 'Rumtek Monastery Complex',
        coordinates: { lat: 27.3048, lng: 88.6318 },
        altitude: 5800,
        district: 'East Sikkim'
      },
      status: 'safe',
      batteryLevel: 91,
      digitalIdVerified: false,
      blockchainHash: null,
      emergencyContact: {
        name: 'Sarah Johnson',
        phone: '+1-555-987-6543',
        relation: 'Wife'
      },
      visitHistory: [
        { location: 'Gangtok', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { location: 'Enchey Monastery', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) }
      ],
      safeZoneViolations: 0,
      totalIncidents: 0
    },
    {
      id: 'TID-2025-0201',
      name: 'Anita Devi',
      phone: '+91-9434-789012',
      email: 'anita.devi@rediffmail.com',
      nationality: 'Indian',
      age: 31,
      gender: 'Female',
      registrationDate: new Date('2025-01-17'),
      lastActivity: new Date(Date.now() - 15 * 60 * 1000),
      currentLocation: {
        name: 'Tsomgo Lake (Changu Lake)',
        coordinates: { lat: 27.3722, lng: 88.7587 },
        altitude: 12400,
        district: 'East Sikkim'
      },
      status: 'safe',
      batteryLevel: 78,
      digitalIdVerified: true,
      blockchainHash: '0x3c4d5e6f7890abcdef1234567890ab1234',
      emergencyContact: {
        name: 'Ramesh Devi',
        phone: '+91-9123-456789',
        relation: 'Husband'
      },
      visitHistory: [
        { location: 'Kyongnosla Alpine Sanctuary', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { location: 'Gangtok', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) }
      ],
      safeZoneViolations: 0,
      totalIncidents: 1
    },
    {
      id: 'TID-2025-0087',
      name: 'David Chen',
      phone: '+65-9123-4567',
      email: 'david.chen@gmail.com',
      nationality: 'Singaporean',
      age: 29,
      gender: 'Male',
      registrationDate: new Date('2025-01-18'),
      lastActivity: new Date(Date.now() - 10 * 60 * 1000),
      currentLocation: {
        name: 'MG Marg, Gangtok',
        coordinates: { lat: 27.3314, lng: 88.6138 },
        altitude: 5500,
        district: 'East Sikkim'
      },
      status: 'safe',
      batteryLevel: 55,
      digitalIdVerified: true,
      blockchainHash: '0x4d5e6f7890abcdef1234567890abcdef12',
      emergencyContact: {
        name: 'Lisa Chen',
        phone: '+65-9876-5432',
        relation: 'Sister'
      },
      visitHistory: [
        { location: 'Hanuman Tok', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { location: 'Ganesh Tok', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) }
      ],
      safeZoneViolations: 0,
      totalIncidents: 1
    },
    {
      id: 'TID-2025-0298',
      name: 'Sarah Williams',
      phone: '+44-7123-456789',
      email: 'sarah.williams@outlook.com',
      nationality: 'British',
      age: 26,
      gender: 'Female',
      registrationDate: new Date('2025-01-19'),
      lastActivity: new Date(Date.now() - 60 * 60 * 1000),
      currentLocation: {
        name: 'NH10 between Gangtok-Pelling',
        coordinates: { lat: 27.2046, lng: 88.2587 },
        altitude: 4200,
        district: 'West Sikkim'
      },
      status: 'emergency',
      batteryLevel: 23,
      digitalIdVerified: true,
      blockchainHash: '0x5e6f7890abcdef1234567890abcdef1234',
      emergencyContact: {
        name: 'James Williams',
        phone: '+44-7987-654321',
        relation: 'Brother'
      },
      visitHistory: [
        { location: 'Pelling', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { location: 'Khecheopalri Lake', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) }
      ],
      safeZoneViolations: 2,
      totalIncidents: 3
    }
  ];

  useEffect(() => {
    setTourists(mockTourists);
  }, []);

  // Real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTourists(prev => prev.map(tourist => ({
        ...tourist,
        lastActivity: new Date(tourist.lastActivity.getTime() + Math.random() * 60000),
        batteryLevel: Math.max(0, tourist.batteryLevel - (Math.random() * 0.5)),
        currentLocation: {
          ...tourist.currentLocation,
          coordinates: {
            lat: tourist.currentLocation.coordinates.lat + (Math.random() - 0.5) * 0.001,
            lng: tourist.currentLocation.coordinates.lng + (Math.random() - 0.5) * 0.001
          }
        }
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800';
      case 'alert': return 'bg-yellow-100 text-yellow-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBatteryIcon = (battery) => {
    if (battery > 75) return '🔋';
    if (battery > 50) return '🔋';
    if (battery > 25) return '🪫';
    return '🪫';
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || tourist.status === filters.status;
    const matchesLocation = filters.location === 'all' || tourist.currentLocation.district === filters.location;
    const matchesId = filters.idVerification === 'all' || 
                     (filters.idVerification === 'verified' && tourist.digitalIdVerified) ||
                     (filters.idVerification === 'unverified' && !tourist.digitalIdVerified);
    const matchesBattery = filters.batteryLevel === 'all' ||
                          (filters.batteryLevel === 'low' && tourist.batteryLevel < 30) ||
                          (filters.batteryLevel === 'medium' && tourist.batteryLevel >= 30 && tourist.batteryLevel < 70) ||
                          (filters.batteryLevel === 'high' && tourist.batteryLevel >= 70);

    return matchesSearch && matchesStatus && matchesLocation && matchesId && matchesBattery;
  });

  const touristStats = {
    total: tourists.length,
    safe: tourists.filter(t => t.status === 'safe').length,
    alert: tourists.filter(t => t.status === 'alert').length,
    emergency: tourists.filter(t => t.status === 'emergency').length,
    verified: tourists.filter(t => t.digitalIdVerified).length,
    lowBattery: tourists.filter(t => t.batteryLevel < 30).length
  };

  const districtData = [
    { name: 'East Sikkim', tourists: tourists.filter(t => t.currentLocation.district === 'East Sikkim').length },
    { name: 'West Sikkim', tourists: tourists.filter(t => t.currentLocation.district === 'West Sikkim').length },
    { name: 'North Sikkim', tourists: tourists.filter(t => t.currentLocation.district === 'North Sikkim').length },
    { name: 'South Sikkim', tourists: tourists.filter(t => t.currentLocation.district === 'South Sikkim').length }
  ];

  const batteryData = [
    { level: 'High (70%+)', count: tourists.filter(t => t.batteryLevel >= 70).length, color: '#10B981' },
    { level: 'Medium (30-70%)', count: tourists.filter(t => t.batteryLevel >= 30 && t.batteryLevel < 70).length, color: '#F59E0B' },
    { level: 'Low (<30%)', count: tourists.filter(t => t.batteryLevel < 30).length, color: '#EF4444' }
  ];

  const handleTrackTourist = (tourist) => {
    setSelectedTourist(tourist);
    setShowDetailsModal(true);
  };

  const handleSendAlert = (touristId) => {
    // Simulate sending alert
    setTourists(prev => prev.map(t => 
      t.id === touristId 
        ? { 
            ...t, 
            lastActivity: new Date(),
            // Add notification sent status
          }
        : t
    ));
    alert(`Alert sent to ${touristId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Sikkim Tourist Tracker</span>
            </h2>
            <p className="text-gray-600">Real-time tracking and monitoring of all registered tourists across Sikkim</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center bg-white rounded-lg px-3 py-2 shadow-sm">
              <div className="text-xs text-gray-500">Last Updated</div>
              <div className="text-sm font-semibold text-gray-900">{new Date().toLocaleTimeString()}</div>
            </div>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tourists</p>
              <p className="text-2xl font-bold text-blue-600">{touristStats.total}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Safe</p>
              <p className="text-2xl font-bold text-green-600">{touristStats.safe}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alerts</p>
              <p className="text-2xl font-bold text-yellow-600">{touristStats.alert}</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <div className="w-6 h-6 bg-yellow-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emergency</p>
              <p className="text-2xl font-bold text-red-600">{touristStats.emergency}</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <div className="w-6 h-6 bg-red-600 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ID Verified</p>
              <p className="text-2xl font-bold text-purple-600">{touristStats.verified}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Battery</p>
              <p className="text-2xl font-bold text-orange-600">{touristStats.lowBattery}</p>
            </div>
            <div className="bg-orange-100 p-2 rounded-full">
              <span className="text-orange-600 text-lg">🪫</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Tourist Distribution by District</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="tourists" fill="#14b8a6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Battery Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Battery Level Distribution</h3>
          <div className="space-y-4">
            {batteryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                  <span className="text-gray-500 text-sm">tourists</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Tourists</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="safe">Safe</option>
              <option value="alert">Alert</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Districts</option>
              <option value="East Sikkim">East Sikkim</option>
              <option value="West Sikkim">West Sikkim</option>
              <option value="North Sikkim">North Sikkim</option>
              <option value="South Sikkim">South Sikkim</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Digital ID</label>
            <select
              value={filters.idVerification}
              onChange={(e) => setFilters({...filters, idVerification: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All IDs</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Battery</label>
            <select
              value={filters.batteryLevel}
              onChange={(e) => setFilters({...filters, batteryLevel: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Levels</option>
              <option value="high">High (70%+)</option>
              <option value="medium">Medium (30-70%)</option>
              <option value="low">Low (less than 30%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tourist List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tracked Tourists ({filteredTourists.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTourists.map((tourist) => (
            <div key={tourist.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {tourist.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-medium text-gray-900">{tourist.name}</h4>
                      <span className="text-sm text-gray-500">({tourist.nationality})</span>
                      {tourist.digitalIdVerified ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Unverified
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSendAlert(tourist.id)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition"
                      >
                        Send Alert
                      </button>
                      <button 
                        onClick={() => handleTrackTourist(tourist)}
                        className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition"
                      >
                        Track Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="font-medium text-gray-700">Tourist ID:</span>
                      <p className="text-gray-600 font-mono">{tourist.id}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Current Location:</span>
                      <p className="text-gray-600">{tourist.currentLocation.name}</p>
                      <p className="text-xs text-gray-500">Altitude: {tourist.currentLocation.altitude} ft</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Contact:</span>
                      <p className="text-gray-600">{tourist.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Activity:</span>
                      <p className="text-gray-600">{formatTime(tourist.lastActivity)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="font-medium text-gray-700">Age/Gender:</span>
                      <p className="text-gray-600">{tourist.age} years, {tourist.gender}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Registered:</span>
                      <p className="text-gray-600">{tourist.registrationDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Emergency Contact:</span>
                      <p className="text-gray-600">{tourist.emergencyContact.name} ({tourist.emergencyContact.relation})</p>
                      <p className="text-xs text-gray-500">{tourist.emergencyContact.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Safety Stats:</span>
                      <p className="text-gray-600">Violations: {tourist.safeZoneViolations}, Incidents: {tourist.totalIncidents}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tourist.status)}`}>
                        {tourist.status.toUpperCase()}
                      </span>
                      <span className={`flex items-center ${getBatteryColor(tourist.batteryLevel)}`}>
                        <span className="mr-1">{getBatteryIcon(tourist.batteryLevel)}</span>
                        {Math.round(tourist.batteryLevel)}%
                      </span>
                      <span className="text-gray-500">
                        GPS: {tourist.currentLocation.coordinates.lat.toFixed(4)}, {tourist.currentLocation.coordinates.lng.toFixed(4)}
                      </span>
                      {tourist.blockchainHash && (
                        <span className="text-teal-600 font-mono text-xs">
                          Blockchain: {tourist.blockchainHash.substring(0, 10)}...
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition">
                        Call Tourist
                      </button>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tourist Details Modal */}
      {showDetailsModal && selectedTourist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 border-b border-gray-200 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedTourist.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedTourist.name}</h3>
                    <p className="text-gray-600">Tourist ID: {selectedTourist.id}</p>
                    <p className="text-sm text-gray-500">{selectedTourist.nationality} • {selectedTourist.age} years • {selectedTourist.gender}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-white p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Current Status</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTourist.status)}`}>
                        {selectedTourist.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Battery Level:</span>
                      <span className={`font-medium ${getBatteryColor(selectedTourist.batteryLevel)}`}>
                        {getBatteryIcon(selectedTourist.batteryLevel)} {Math.round(selectedTourist.batteryLevel)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Activity:</span>
                      <span>{formatTime(selectedTourist.lastActivity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Digital ID:</span>
                      {selectedTourist.digitalIdVerified ? (
                        <span className="text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-600">Unverified</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <p className="font-medium">{selectedTourist.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium">{selectedTourist.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Emergency Contact:</span>
                      <p className="font-medium">{selectedTourist.emergencyContact.name}</p>
                      <p className="text-xs text-gray-500">{selectedTourist.emergencyContact.relation}</p>
                      <p className="text-xs text-gray-500">{selectedTourist.emergencyContact.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Safety Statistics</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zone Violations:</span>
                      <span className="font-medium text-red-600">{selectedTourist.safeZoneViolations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Incidents:</span>
                      <span className="font-medium text-yellow-600">{selectedTourist.totalIncidents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Date:</span>
                      <span>{selectedTourist.registrationDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Location */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Current Location</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium text-gray-900">{selectedTourist.currentLocation.name}</p>
                    <p className="text-xs text-gray-500">{selectedTourist.currentLocation.district}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Coordinates:</span>
                    <p className="font-mono text-gray-900">
                      {selectedTourist.currentLocation.coordinates.lat.toFixed(6)}, {selectedTourist.currentLocation.coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Altitude:</span>
                    <p className="font-medium text-gray-900">{selectedTourist.currentLocation.altitude} ft above sea level</p>
                  </div>
                </div>
              </div>

              {/* Blockchain Information */}
              {selectedTourist.blockchainHash && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Blockchain Digital Identity</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Blockchain Hash:</span>
                      <p className="font-mono text-gray-900 break-all">{selectedTourist.blockchainHash}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-green-600 font-medium">Identity Verified on Blockchain</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visit History */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Recent Visit History</h4>
                <div className="space-y-3">
                  {selectedTourist.visitHistory.map((visit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{visit.location}</p>
                          <p className="text-xs text-gray-500">{formatTime(visit.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium">
                  Emergency Alert
                </button>
                <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition font-medium">
                  Send Warning
                </button>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium">
                  Call Tourist
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  View Live Location
                </button>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                  Contact Emergency Contact
                </button>
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition font-medium">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristTracker;