import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Inquiries from './pages/Inquiries';
import ProjectsManager from './pages/ProjectsManager';
import TestimonialsManager from './pages/TestimonialsManager';
import FoundersManager from './pages/FoundersManager';
import StatsManager from './pages/StatsManager';
import LiveChat from './pages/LiveChat';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <Sidebar />
    <main className="admin-main">{children}</main>
  </div>
);

const AppRoutes = () => {
  const { token, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><AdminLayout><Bookings /></AdminLayout></ProtectedRoute>} />
      <Route path="/inquiries" element={<ProtectedRoute><AdminLayout><Inquiries /></AdminLayout></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><AdminLayout><ProjectsManager /></AdminLayout></ProtectedRoute>} />
      <Route path="/testimonials" element={<ProtectedRoute><AdminLayout><TestimonialsManager /></AdminLayout></ProtectedRoute>} />
      <Route path="/founders" element={<ProtectedRoute><AdminLayout><FoundersManager /></AdminLayout></ProtectedRoute>} />
      <Route path="/stats" element={<ProtectedRoute><AdminLayout><StatsManager /></AdminLayout></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><AdminLayout><LiveChat /></AdminLayout></ProtectedRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
