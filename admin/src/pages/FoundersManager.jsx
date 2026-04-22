import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Plus, Pencil, Trash2, X } from 'lucide-react';

const FoundersManager = () => {
  const { token, API_URL } = useAuth();
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', image: '', description: '', sortOrder: 0 });
  const [toast, setToast] = useState(null);

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/founders`);
    const data = await res.json();
    if (Array.isArray(data)) setItems(data);
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', role: '', image: '', description: '', sortOrder: 0 }); setShowModal(true); };
  const openEdit = (item) => { setEditing(item._id); setForm({ name: item.name, role: item.role, image: item.image, description: item.description, sortOrder: item.sortOrder || 0 }); setShowModal(true); };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/founders/${editing}` : `${API_URL}/founders`;
    const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowModal(false); fetchItems(); showToast(editing ? 'Updated' : 'Created'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this founder?')) return;
    await fetch(`${API_URL}/founders/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setItems(prev => prev.filter(i => i._id !== id));
    showToast('Deleted');
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <>
      <div className="admin-header">
        <div><h2>Founders / Team</h2><p>Manage leadership profiles</p></div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Member</button>
      </div>
      <div className="admin-content">
        <div className="data-table-wrapper">
          <div className="table-header"><h3>All Members ({items.length})</h3></div>
          {items.length > 0 ? (
            <table>
              <thead><tr><th>Photo</th><th>Name</th><th>Role</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(i => (
                  <tr key={i._id}>
                    <td>
                      {i.image ? (
                        <img src={i.image} alt={i.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Users size={16} style={{ color: 'var(--text-muted)' }} />
                        </div>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{i.name}</td>
                    <td>{i.role}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon" onClick={() => openEdit(i)}><Pencil size={15} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(i._id)}><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state"><Users size={40} /><h3>No members</h3><p>Add team members.</p></div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{editing ? 'Edit Member' : 'Add Member'}</h3><button className="btn-icon" onClick={() => setShowModal(false)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group"><label>Name</label><input name="name" value={form.name} onChange={onChange} /></div>
                <div className="form-group"><label>Role</label><input name="role" value={form.role} onChange={onChange} /></div>
              </div>
              <div className="form-group"><label>Image URL</label><input name="image" value={form.image} onChange={onChange} /></div>
              <div className="form-group"><label>Description</label><textarea name="description" value={form.description} onChange={onChange} /></div>
              <div className="form-group"><label>Sort Order</label><input name="sortOrder" type="number" value={form.sortOrder} onChange={onChange} /></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast toast-success">{toast}</div>}
    </>
  );
};

export default FoundersManager;
