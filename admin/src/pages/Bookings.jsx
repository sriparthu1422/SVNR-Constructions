import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CalendarCheck, Trash2, Search } from 'lucide-react';

const Bookings = () => {
  const { token, API_URL } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const fetchBookings = async () => {
    const res = await fetch(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (Array.isArray(data)) setBookings(data);
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return;
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setBookings(prev => prev.filter(b => b._id !== id));
      showToast('Booking deleted');
    }
  };

  const handleStatusChange = async (id, status) => {
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBookings(prev => prev.map(b => b._id === id ? updated : b));
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.project.toLowerCase().includes(search.toLowerCase()) ||
    b.phone.includes(search)
  );

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>Bookings</h2>
          <p>{bookings.length} site visit bookings</p>
        </div>
      </div>
      <div className="admin-content">
        <div className="data-table-wrapper">
          <div className="table-header">
            <h3>All Bookings</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                className="table-search"
                placeholder="Search bookings..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          {filtered.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b._id}>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{b.name}</td>
                      <td>{b.email}</td>
                      <td>{b.phone}</td>
                      <td>{b.date}</td>
                      <td>{b.project}</td>
                      <td>
                        <select
                          value={b.status}
                          onChange={e => handleStatusChange(b._id, e.target.value)}
                          style={{
                            background: 'var(--bg-primary)', border: '1px solid var(--border)',
                            color: 'var(--text-primary)', borderRadius: 6, padding: '4px 8px',
                            fontSize: 12, cursor: 'pointer'
                          }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn-icon danger" onClick={() => handleDelete(b._id)}>
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <CalendarCheck size={40} />
              <h3>No bookings found</h3>
              <p>Bookings will appear when customers book site visits.</p>
            </div>
          )}
        </div>
      </div>
      {toast && <div className="toast toast-success">{toast}</div>}
    </>
  );
};

export default Bookings;
