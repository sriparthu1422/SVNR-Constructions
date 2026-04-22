import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CalendarCheck, MessageSquare, Building2, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { token, API_URL } = useAuth();
  const [counts, setCounts] = useState({ bookings: 0, inquiries: 0, projects: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API_URL}/bookings`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/inquiries`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/projects`).then(r => r.json()),
    ]).then(([bookings, inquiries, projects]) => {
      setCounts({
        bookings: Array.isArray(bookings) ? bookings.length : 0,
        inquiries: Array.isArray(inquiries) ? inquiries.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
      });
      if (Array.isArray(bookings)) setRecentBookings(bookings.slice(0, 5));
    }).catch(() => {});
  }, [token, API_URL]);

  const stats = [
    { icon: CalendarCheck, label: 'Total Bookings', value: counts.bookings, color: 'var(--accent)' },
    { icon: MessageSquare, label: 'Total Inquiries', value: counts.inquiries, color: 'var(--info)' },
    { icon: Building2, label: 'Total Projects', value: counts.projects, color: 'var(--success)' },
    { icon: TrendingUp, label: 'Conversion Rate', value: counts.bookings > 0 ? '—' : '—', color: 'var(--warning)' },
  ];

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your construction business</p>
        </div>
      </div>
      <div className="admin-content">
        <div className="stat-grid">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div className="stat-card" key={label}>
              <div className="stat-icon" style={{ background: `${color}15`, color }}>
                <Icon size={22} />
              </div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="data-table-wrapper">
          <div className="table-header">
            <h3>Recent Bookings</h3>
          </div>
          {recentBookings.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Project</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b._id}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{b.name}</td>
                    <td>{b.project}</td>
                    <td>{b.phone}</td>
                    <td>{b.date}</td>
                    <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <CalendarCheck size={40} />
              <h3>No bookings yet</h3>
              <p>Bookings will appear here when customers submit the form.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
