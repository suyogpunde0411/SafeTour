import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [refreshData, setRefreshData] = useState(0);

  // Mock data for charts
  const touristActivityData = [
    { time: '00:00', active: 120, total: 1200 },
    { time: '04:00', active: 80, total: 1200 },
    { time: '08:00', active: 450, total: 1200 },
    { time: '12:00', active: 890, total: 1200 },
    { time: '16:00', active: 720, total: 1200 },
    { time: '20:00', active: 540, total: 1200 },
    { time: '23:59', active: 200, total: 1200 }
  ];

  const incidentData = [
    { time: '00:00', incidents: 0, emergencies: 0 },
    { time: '04:00', incidents: 1, emergencies: 0 },
    { time: '08:00', incidents: 3, emergencies: 1 },
    { time: '12:00', incidents: 8, emergencies: 2 },
    { time: '16:00', incidents: 5, emergencies: 1 },
    { time: '20:00', incidents: 7, emergencies: 3 },
    { time: '23:59', incidents: 2, emergencies: 0 }
  ];

  const safeZoneData = [
    { name: 'Tourist District', violations: 12, color: '#10B981' },
    { name: 'City Center', violations: 8, color: '#F59E0B' },
    { name: 'Beach Area', violations: 15, color: '#EF4444' },
    { name: 'Shopping Mall', violations: 3, color: '#8B5CF6' },
    { name: 'Cultural Sites', violations: 6, color: '#06B6D4' }
  ];

  const alertTypeData = [
    { name: 'SOS Emergency', value: 35, color: '#EF4444' },
    { name: 'Medical Alert', value: 25, color: '#F97316' },
    { name: 'Zone Violation', value: 20, color: '#F59E0B' },
    { name: 'Lost Tourist', value: 15, color: '#8B5CF6' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const responseTimeData = [
    { category: 'Emergency', avgTime: 1.2, target: 2.0 },
    { category: 'Medical', avgTime: 2.8, target: 5.0 },
    { category: 'Zone Violation', avgTime: 8.5, target: 10.0 },
    { category: 'General Alert', avgTime: 15.2, target: 20.0 }
  ];

  const topStats = [
    {
      title: 'Total Tourists',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Now',
      value: '892',
      change: '+5%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Incidents (24h)',
      value: '23',
      change: '-8%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Response Time',
      value: '1.8min',
      change: '-15%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'emergency',
      title: 'SOS Alert Resolved',
      description: 'Tourist TID-2025-0047 emergency resolved successfully',
      time: '2 minutes ago',
      status: 'resolved'
    },
    {
      id: 2,
      type: 'violation',
      title: 'Safe Zone Violation',
      description: 'Tourist TID-2025-0089 entered restricted area',
      time: '5 minutes ago',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'registration',
      title: 'New Tourist Registration',
      description: '15 new tourists registered in the last hour',
      time: '12 minutes ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'system',
      title: 'Blockchain Verification',
      description: 'Digital ID verification completed for 23 tourists',
      time: '18 minutes ago',
      status: 'completed'
    },
    {
      id: 5,
      type: 'medical',
      title: 'Medical Alert',
      description: 'Tourist TID-2025-0123 medical alert - ambulance dispatched',
      time: '25 minutes ago',
      status: 'in_progress'
    }
  ];

  const criticalAreas = [
    {
      name: 'Downtown Market',
      riskLevel: 'High',
      incidents: 8,
      tourists: 156,
      color: 'bg-red-100 text-red-800'
    },
    {
      name: 'Beach Promenade',
      riskLevel: 'Medium',
      incidents: 3,
      tourists: 89,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'Cultural Quarter',
      riskLevel: 'Low',
      incidents: 1,
      tourists: 67,
      color: 'bg-green-100 text-green-800'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshData(prev => prev + 1);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'emergency':
        return (
          <div className="bg-red-100 p-2 rounded-full">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'violation':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'registration':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="bg-teal-100 p-2 rounded-full">
            <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'medical':
        return (
          <div className="bg-red-100 p-2 rounded-full">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6.414A1 1 0 0117.414 12L10 19.414a1 1 0 01-1.414 0L1.586 12A1 1 0 012 11.414V5z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Resolved</span>;
      case 'investigating':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Investigating</span>;
      case 'in_progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Overview</h2>
            <p className="text-gray-600">Real-time tourist safety analytics and monitoring dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-medium">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last period</span>
                </div>
              </div>
              <div className={`bg-gradient-to-r ${stat.color} text-white p-4 rounded-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tourist Activity Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Tourist Activity</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <span>Active Tourists</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={touristActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#14b8a6"
                strokeWidth={2}
                fill="#14b8a6"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Incident Trends Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Incident Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Incidents</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Emergencies</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="incidents" stroke="#f97316" strokeWidth={2} />
              <Line type="monotone" dataKey="emergencies" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Types Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Alert Types Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={alertTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {alertTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {alertTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Response Time Analysis */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Response Time Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={responseTimeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="category" type="category" stroke="#6b7280" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="avgTime" fill="#14b8a6" radius={4} />
              <Bar dataKey="target" fill="#e5e7eb" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Critical Areas */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Critical Areas Monitor</h3>
          <div className="space-y-4">
            {criticalAreas.map((area, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{area.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${area.color}`}>
                    {area.riskLevel}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Incidents:</span>
                    <span className="font-medium text-gray-900 ml-2">{area.incidents}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tourists:</span>
                    <span className="font-medium text-gray-900 ml-2">{area.tourists}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
            View All Activities
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                <p className="text-gray-500 text-xs mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;