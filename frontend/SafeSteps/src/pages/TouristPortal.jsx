import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TouristDashboard from '../components/tourist/TouristDashboard';
import MapView from '../components/tourist/MapView';
import SOSButton from '../components/tourist/SOSButton';
import PlacesGuide from '../components/tourist/PlacesGuide';

const TouristPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">
      <Routes>
        <Route path="/" element={<TouristDashboard />} />
        <Route path="/dashboard" element={<TouristDashboard />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/sos" element={<SOSButton />} />
        <Route path="/places" element={<PlacesGuide />} />
      </Routes>
    </div>
  );
};
export default TouristPortal;