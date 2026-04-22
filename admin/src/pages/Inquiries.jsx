import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Trash2, Search } from 'lucide-react';

const Inquiries = () => {
  const { token, API_URL } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const fetchInquiries = async () => {
    const res = await fetch(`${API_URL}/inquiries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (Array.isArray(data)) setInquiries(data);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    const res = await fetch(`${API_URL}/inquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setInquiries(prev => prev.filter(i => i._id !== id));
      showToast('Inquiry deleted');
    }
  };

  const handleStatusChange = async (id, status) => {
    const res = await fetch(`${API_URL}/inquiries/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setInquiries(prev => prev.map(i => i._id === id ? updated : i));
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = inquiries.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.subject.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>Inquiries</h2>
          <p>{inquiries.length} contact form submissions</p>
        </div>
      </div>
      <div className="admin-content">
        <div className="data-table-wrapper">
          <div className="table-header">
            <h3>All Inquiries</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input className="table-search" placeholder="Search inquiries..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          {filtered.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map(i => (
                    <tr key={i._id}>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{i.name}</td>
                      <td>{i.email}</td>
                      <td>{i.subject}</td>
                      <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.message}</td>
                      <td>
                        <select value={i.status} onChange={e => handleStatusChange(i._id, e.target.value)}
                          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer' }}>
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn-icon danger" onClick={() => handleDelete(i._id)}><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <MessageSquare size={40} />
              <h3>No inquiries found</h3>
              <p>Inquiries will appear when customers use the contact form.</p>
            </div>
          )}
        </div>
      </div>
      {toast && <div className="toast toast-success">{toast}</div>}
    </>
  );
};

export default Inquiries;
