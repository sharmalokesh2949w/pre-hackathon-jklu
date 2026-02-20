import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { AnalysisProvider } from './context/AnalysisContext';

// Layout
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import CounsellorSidebar from './components/layout/CounsellorSidebar';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Student Pages
import Dashboard from './pages/Dashboard';
import AnalysisDashboard from './pages/AnalysisDashboard';
import Mentor from './pages/Mentor';
import Roadmap from './pages/Roadmap';
import Profile from './pages/Profile';
import CareerCompare from './pages/CareerCompare';
import GrowthTracking from './pages/GrowthTracking';
import CounsellorConnect from './pages/CounsellorConnect';
import Onboarding from './pages/Onboarding';

// Counsellor Pages
import CounsellorDashboard from './pages/CounsellorDashboard';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoading(false), 800);
    return () => clearTimeout(t);
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
          <div className="w-8 h-8 border-3 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto" />
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

  // ── Counsellor Layout ──────────────────────────────────────────────────────
  if (user.role === 'counsellor') {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <CounsellorSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<CounsellorDashboard />} />
              <Route path="/dashboard" element={<CounsellorDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  // ── Student Layout ─────────────────────────────────────────────────────────
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
              <Route path="/profile" element={<Profile />} />
              <Route path="/compare" element={<CareerCompare />} />
              <Route path="/growth" element={<GrowthTracking />} />
              <Route path="/counsellor" element={<CounsellorConnect />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </AnalysisProvider>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
