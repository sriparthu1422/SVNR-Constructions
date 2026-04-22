import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Pencil, X, Save } from 'lucide-react';

const StatsManager = () => {
  const { token, API_URL } = useAuth();
  const [stats, setStats] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ label: '', value: '' });
  const [toast, setToast] = useState(null);

  const fetchStats = async () => {
    const res = await fetch(`${API_URL}/stats`);
    const data = await res.json();
    if (Array.isArray(data)) setStats(data);
  };
  useEffect(() => { fetchStats(); }, []);

  const startEdit = (stat) => {
    setEditingId(stat._id);
    setEditForm({ label: stat.label, value: stat.value });
  };

  const handleSave = async (id) => {
    const res = await fetch(`${API_URL}/stats/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditingId(null);
      fetchStats();
      showToast('Stat updated');
    }
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <>
      <div className="admin-header">
        <div><h2>Stats</h2><p>Edit the numbers displayed on the About page</p></div>
      </div>
      <div className="admin-content">
        <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {stats.map(stat => (
            <div className="stat-card" key={stat._id} style={{ position: 'relative' }}>
              {editingId === stat._id ? (
                <div>
                  <div className="form-group" style={{ marginBottom: 12 }}>
                    <label>Label</label>
                    <input value={editForm.label} onChange={e => setEditForm(p => ({ ...p, label: e.target.value }))} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 12 }}>
                    <label>Value</label>
                    <input value={editForm.value} onChange={e => setEditForm(p => ({ ...p, value: e.target.value }))} />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-primary btn-sm" onClick={() => handleSave(stat._id)}><Save size={14} /> Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}><X size={14} /> Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="stat-icon" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                    <BarChart3 size={22} />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <button
                    className="btn-icon"
                    style={{ position: 'absolute', top: 16, right: 16 }}
                    onClick={() => startEdit(stat)}
                  >
                    <Pencil size={14} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {toast && <div className="toast toast-success">{toast}</div>}
    </>
  );
};

export default StatsManager;
