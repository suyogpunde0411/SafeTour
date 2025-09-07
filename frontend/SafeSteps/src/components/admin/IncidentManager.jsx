import React, { useState, useEffect } from 'react';

const IncidentManager = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    priority: 'all',
    timeRange: '24h'
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock incident data specific to Sikkim
  const mockIncidents = [
    {
      id: 'INC-2025-001',
      touristId: 'TID-2025-0123',
      touristName: 'Rajesh Kumar',
      type: 'emergency',
      status: 'active',
      priority: 'critical',
      title: 'Altitude Sickness - Nathula Pass',
      description: 'Tourist experiencing severe altitude sickness at 14,140 ft. Symptoms include headache, nausea, and difficulty breathing. Immediate medical attention required.',
      location: { lat: 27.3748, lng: 88.7485, address: 'Nathula Pass, East Sikkim (14,140 ft)' },
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      responderId: 'RESP-001',
      responderName: 'High Altitude Medical Team Alpha',
      estimatedArrival: '12 minutes',
      contact: '+91-9832-567890',
      digitalIdVerified: true,
      batteryLevel: 67,
      altitude: 14140,
      weather: 'Clear, -2°C, Low oxygen',
      updates: [
        { timestamp: new Date(Date.now() - 10 * 60 * 1000), message: 'Altitude sickness reported via SOS', user: 'Tourist App' },
        { timestamp: new Date(Date.now() - 8 * 60 * 1000), message: 'High altitude medical team dispatched', user: 'Emergency Dispatcher' },
        { timestamp: new Date(Date.now() - 5 * 60 * 1000), message: 'Oxygen support team en route from Gangtok', user: 'Medical Team Alpha' }
      ]
    },
    {
      id: 'INC-2025-002',
      touristId: 'TID-2025-0089',
      touristName: 'Priya Sharma',
      type: 'violation',
      status: 'investigating',
      priority: 'high',
      title: 'Restricted Border Area Entry',
      description: 'Tourist crossed into restricted Indo-China border zone near Nathu La. Border patrol notified.',
      location: { lat: 27.3901, lng: 88.8420, address: 'Restricted Border Zone, Nathu La' },
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      responderId: 'RESP-002',
      responderName: 'Border Security Force Unit Beta',
      estimatedArrival: '8 minutes',
      contact: '+91-9733-456789',
      digitalIdVerified: true,
      batteryLevel: 42,
      altitude: 14200,
      weather: 'Cloudy, -5°C, Strong winds',
      updates: [
        { timestamp: new Date(Date.now() - 45 * 60 * 1000), message: 'GPS alert: Tourist entered restricted zone', user: 'Geo-fence System' },
        { timestamp: new Date(Date.now() - 40 * 60 * 1000), message: 'Border Security Force notified', user: 'System' },
        { timestamp: new Date(Date.now() - 30 * 60 * 1000), message: 'BSF patrol unit assigned', user: 'BSF Control Room' }
      ]
    },
    {
      id: 'INC-2025-003',
      touristId: 'TID-2025-0156',
      touristName: 'Michael Johnson',
      type: 'assistance',
      status: 'resolved',
      priority: 'low',
      title: 'Lost Tourist - Rumtek Monastery',
      description: 'Foreign tourist lost route from Rumtek Monastery to Gangtok. Language barrier issue resolved.',
      location: { lat: 27.3048, lng: 88.6318, address: 'Rumtek Monastery Complex, East Sikkim' },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      responderId: 'RESP-003',
      responderName: 'Tourist Guide Service',
      estimatedArrival: 'Completed',
      contact: '+91-8967-123456',
      digitalIdVerified: false,
      batteryLevel: 91,
      altitude: 5800,
      weather: 'Partly cloudy, 18°C',
      updates: [
        { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), message: 'Tourist requested navigation help', user: 'Tourist' },
        { timestamp: new Date(Date.now() - 115 * 60 * 1000), message: 'Local guide assigned', user: 'Tourist Help Center' },
        { timestamp: new Date(Date.now() - 90 * 60 * 1000), message: 'Tourist safely guided to MG Marg', user: 'Guide Service' },
        { timestamp: new Date(Date.now() - 85 * 60 * 1000), message: 'Incident resolved', user: 'System' }
      ]
    },
    {
      id: 'INC-2025-004',
      touristId: 'TID-2025-0201',
      touristName: 'Anita Devi',
      type: 'weather',
      status: 'active',
      priority: 'high',
      title: 'Sudden Weather Change - Tsomgo Lake',
      description: 'Tourist group of 8 caught in sudden snowfall and temperature drop at Tsomgo Lake. Road conditions deteriorating.',
      location: { lat: 27.3722, lng: 88.7587, address: 'Tsomgo Lake (Changu Lake), East Sikkim' },
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      responderId: 'RESP-004',
      responderName: 'Weather Emergency Team Charlie',
      estimatedArrival: '25 minutes',
      contact: '+91-9434-789012',
      digitalIdVerified: true,
      batteryLevel: 78,
      altitude: 12400,
      weather: 'Heavy snow, -8°C, Poor visibility',
      updates: [
        { timestamp: new Date(Date.now() - 30 * 60 * 1000), message: 'Weather emergency reported', user: 'Tourist Group Leader' },
        { timestamp: new Date(Date.now() - 25 * 60 * 1000), message: 'Weather rescue team notified', user: 'Emergency Control' },
        { timestamp: new Date(Date.now() - 20 * 60 * 1000), message: 'Snow rescue vehicle dispatched', user: 'Weather Team Charlie' }
      ]
    },
    {
      id: 'INC-2025-005',
      touristId: 'TID-2025-0087',
      touristName: 'David Chen',
      type: 'medical',
      status: 'resolved',
      priority: 'medium',
      title: 'Food Poisoning - MG Marg',
      description: 'Tourist suffered food poisoning after eating local street food. Treated at district hospital.',
      location: { lat: 27.3314, lng: 88.6138, address: 'MG Marg, Gangtok' },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      responderId: 'RESP-005',
      responderName: 'District Hospital Medical Team',
      estimatedArrival: 'Completed',
      contact: '+91-9832-234567',
      digitalIdVerified: true,
      batteryLevel: 55,
      altitude: 5500,
      weather: 'Clear, 22°C',
      updates: [
        { timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), message: 'Food poisoning reported', user: 'Tourist' },
        { timestamp: new Date(Date.now() - 225 * 60 * 1000), message: 'Ambulance dispatched to MG Marg', user: 'Medical Dispatcher' },
        { timestamp: new Date(Date.now() - 210 * 60 * 1000), message: 'Patient admitted to district hospital', user: 'Hospital Staff' },
        { timestamp: new Date(Date.now() - 180 * 60 * 1000), message: 'Treatment completed, tourist recovered', user: 'Medical Team' }
      ]
    },
    {
      id: 'INC-2025-006',
      touristId: 'TID-2025-0298',
      touristName: 'Sarah Williams',
      type: 'landslide',
      status: 'investigating',
      priority: 'critical',
      title: 'Road Blockage - Gangtok to Pelling',
      description: 'Tourist vehicle trapped due to landslide on NH10. Multiple tourists affected. Rescue operations underway.',
      location: { lat: 27.2046, lng: 88.2587, address: 'NH10 between Gangtok-Pelling, West Sikkim' },
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      responderId: 'RESP-006',
      responderName: 'NDRF Rescue Team Delta',
      estimatedArrival: '45 minutes',
      contact: '+91-9647-345678',
      digitalIdVerified: true,
      batteryLevel: 23,
      altitude: 4200,
      weather: 'Heavy rain, 16°C, Landslide risk high',
      updates: [
        { timestamp: new Date(Date.now() - 90 * 60 * 1000), message: 'Landslide reported, tourists trapped', user: 'Tourist Vehicle' },
        { timestamp: new Date(Date.now() - 85 * 60 * 1000), message: 'NDRF team activated', user: 'State Disaster Management' },
        { timestamp: new Date(Date.now() - 70 * 60 * 1000), message: 'Heavy machinery dispatched for road clearing', user: 'PWD Sikkim' },
        { timestamp: new Date(Date.now() - 50 * 60 * 1000), message: 'Helicopter rescue on standby', user: 'NDRF Command' }
      ]
    }
  ];

  useEffect(() => {
    setIncidents(mockIncidents);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'emergency':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      case 'medical':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6.414A1 1 0 0117.414 12L10 19.414a1 1 0 01-1.414 0L1.586 12A1 1 0 012 11.414V5z" clipRule="evenodd" />
          </svg>
        );
      case 'violation':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'weather':
        return (
          <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5c0 .596.207 1.144.552 1.575A3.001 3.001 0 005 13h10a2 2 0 100-4 2 2 0 00-1.999-1.85A3.5 3.5 0 009.5 3h-4z" clipRule="evenodd" />
          </svg>
        );
      case 'landslide':
        return (
          <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filters.status !== 'all' && incident.status !== filters.status) return false;
    if (filters.type !== 'all' && incident.type !== filters.type) return false;
    if (filters.priority !== 'all' && incident.priority !== filters.priority) return false;
    return true;
  });

  const handleAssignResponder = (incidentId) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { 
            ...inc, 
            status: 'investigating',
            responderId: 'RESP-NEW',
            responderName: 'Sikkim Emergency Response Team',
            updates: [
              ...inc.updates,
              { 
                timestamp: new Date(), 
                message: 'Response team assigned', 
                user: 'Emergency Dispatcher' 
              }
            ]
          }
        : inc
    ));
  };

  const handleUpdateStatus = (incidentId, newStatus) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { 
            ...inc, 
            status: newStatus,
            updates: [
              ...inc.updates,
              { 
                timestamp: new Date(), 
                message: `Status updated to ${newStatus}`, 
                user: 'Control Room Admin' 
              }
            ]
          }
        : inc
    ));
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const incidentStats = {
    total: incidents.length,
    active: incidents.filter(inc => inc.status === 'active').length,
    pending: incidents.filter(inc => inc.status === 'pending').length,
    resolved: incidents.filter(inc => inc.status === 'resolved').length,
    critical: incidents.filter(inc => inc.priority === 'critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Sikkim Tourist Incident Management</span>
            </h2>
            <p className="text-gray-600">Real-time monitoring and response for tourist safety across all districts of Sikkim</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center bg-white rounded-lg px-3 py-2 shadow-sm">
              <div className="text-xs text-gray-500">Altitude Range</div>
              <div className="text-sm font-semibold text-gray-900">300m - 14,140m</div>
            </div>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>State Emergency Alert</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sikkim-specific Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{incidentStats.total}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6.414A1 1 0 0117.414 12L10 19.414a1 1 0 01-1.414 0L1.586 12A1 1 0 012 11.414V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-red-600">{incidentStats.active}</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <div className="w-6 h-6 bg-red-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Investigating</p>
              <p className="text-2xl font-bold text-yellow-600">{incidents.filter(inc => inc.status === 'investigating').length}</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{incidentStats.resolved}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-purple-600">{incidentStats.critical}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Incidents</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Types</option>
              <option value="emergency">Emergency</option>
              <option value="medical">Medical</option>
              <option value="violation">Border/Zone Violation</option>
              <option value="weather">Weather Emergency</option>
              <option value="landslide">Landslide/Natural</option>
              <option value="assistance">Tourist Assistance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Incidents ({filteredIncidents.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredIncidents.map((incident) => (
            <div key={incident.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-gray-100 p-2 rounded-full">
                    {getTypeIcon(incident.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-medium text-gray-900">{incident.title}</h4>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(incident.priority)}`} title={`${incident.priority} priority`}></div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {incident.status === 'pending' && (
                        <button
                          onClick={() => handleAssignResponder(incident.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                          Assign Team
                        </button>
                      )}
                      
                      <div className="relative">
                        <select
                          value={incident.status}
                          onChange={(e) => handleUpdateStatus(incident.id, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="investigating">Investigating</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                      
                      <button 
                        onClick={() => {setSelectedIncident(incident); setShowDetailsModal(true);}}
                        className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{incident.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Tourist:</span>
                      <p className="text-gray-600">{incident.touristName} ({incident.touristId})</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Location:</span>
                      <p className="text-gray-600">{incident.location.address}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Responder:</span>
                      <p className="text-gray-600">{incident.responderName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Time:</span>
                      <p className="text-gray-600">{formatTime(incident.timestamp)}</p>
                    </div>
                  </div>

                  {/* Sikkim-specific details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
                    <div>
                      <span className="font-medium text-gray-700">Altitude:</span>
                      <p className="text-gray-600">{incident.altitude} ft</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Weather:</span>
                      <p className="text-gray-600">{incident.weather}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Contact:</span>
                      <p className="text-gray-600">{incident.contact}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                      <span>ETA: {incident.estimatedArrival}</span>
                      <span className={getBatteryColor(incident.batteryLevel)}>Battery: {incident.batteryLevel}%</span>
                      {incident.digitalIdVerified ? (
                        <span className="text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          ID Verified
                        </span>
                      ) : (
                        <span className="text-red-600">ID Pending</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition">
                        Contact Tourist
                      </button>
                      <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition">
                        Send Backup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Details Modal */}
      {showDetailsModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 border-b border-gray-200 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    {getTypeIcon(selectedIncident.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedIncident.title}</h3>
                    <p className="text-gray-600">Incident ID: {selectedIncident.id}</p>
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
              {/* Incident Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Incident Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                        {selectedIncident.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedIncident.priority)}`}></div>
                        <span className="capitalize">{selectedIncident.priority}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="capitalize">{selectedIncident.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reported:</span>
                      <span>{selectedIncident.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ETA:</span>
                      <span>{selectedIncident.estimatedArrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Altitude:</span>
                      <span className="font-mono">{selectedIncident.altitude} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weather:</span>
                      <span>{selectedIncident.weather}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Tourist Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{selectedIncident.touristName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tourist ID:</span>
                      <span className="font-mono">{selectedIncident.touristId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span>{selectedIncident.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Battery:</span>
                      <span className={getBatteryColor(selectedIncident.batteryLevel)}>
                        {selectedIncident.batteryLevel}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Digital ID:</span>
                      {selectedIncident.digitalIdVerified ? (
                        <span className="text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified on Blockchain
                        </span>
                      ) : (
                        <span className="text-red-600">Not Verified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                <p className="text-gray-700">{selectedIncident.description}</p>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Location Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <p className="text-gray-900">{selectedIncident.location.address}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">GPS Coordinates:</span>
                    <p className="text-gray-900 font-mono">
                      {selectedIncident.location.lat.toFixed(6)}, {selectedIncident.location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                    View on Map
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm">
                    Share Location
                  </button>
                </div>
              </div>

              {/* Response Team */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Response Team</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Team:</span>
                    <p className="text-gray-900">{selectedIncident.responderName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Team ID:</span>
                    <p className="text-gray-900 font-mono">{selectedIncident.responderId || 'Not Assigned'}</p>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Activity Timeline</h4>
                <div className="space-y-3">
                  {selectedIncident.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900 text-sm">{update.message}</p>
                          <span className="text-gray-500 text-xs">{formatTime(update.timestamp)}</span>
                        </div>
                        <p className="text-gray-500 text-xs">by {update.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium">
                  Escalate Emergency
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium">
                  Mark Resolved
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  Dispatch Backup Team
                </button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition font-medium">
                  Contact Tourist
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                  Notify Family
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-medium">
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

export default IncidentManager;