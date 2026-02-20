import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { AnalysisProvider } from './context/AnalysisContext';

// Layout
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AnalysisDashboard from './pages/AnalysisDashboard';
import Mentor from './pages/Mentor';
import Roadmap from './pages/Roadmap';
import Assessment from './pages/Assessment';
import Profile from './pages/Profile';
import CareerCompare from './pages/CareerCompare';
import WhatIfSimulator from './pages/WhatIfSimulator';
import GrowthTracking from './pages/GrowthTracking';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-teal-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <span className="text-2xl font-black text-white">C</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            Career<span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Cube</span>
          </h1>
          <div className="w-8 h-8 border-3 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }


  return (
    <AnalysisProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<AnalysisDashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mentor" element={<Mentor />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/skills" element={<Assessment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/compare" element={<CareerCompare />} />
              <Route path="/simulator" element={<WhatIfSimulator />} />
              <Route path="/growth" element={<GrowthTracking />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </AnalysisProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
