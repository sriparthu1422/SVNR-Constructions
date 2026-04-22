import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, CalendarCheck, MessageSquare, Building2,
  Quote, Users, BarChart3, LogOut, MessageCircle
} from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/bookings', icon: CalendarCheck, label: 'Bookings' },
  { to: '/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { to: '/projects', icon: Building2, label: 'Projects' },
  { to: '/testimonials', icon: Quote, label: 'Testimonials' },
  { to: '/founders', icon: Users, label: 'Founders' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
  { to: '/chat', icon: MessageCircle, label: 'Live Chat' },
];

const Sidebar = () => {
  const { logout, admin } = useAuth();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <h1>SVNR<span>.</span> Admin</h1>
        <p>Content Manager</p>
      </div>
      <nav className="sidebar-nav">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        {admin && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, paddingLeft: 14 }}>
            {admin.email}
          </p>
        )}
        <button onClick={logout}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
