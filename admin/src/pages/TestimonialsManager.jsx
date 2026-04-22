import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Quote, Plus, Pencil, Trash2, X } from 'lucide-react';

const TestimonialsManager = () => {
  const { token, API_URL } = useAuth();
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', text: '', location: '', sortOrder: 0 });
  const [toast, setToast] = useState(null);

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/testimonials`);
    const data = await res.json();
    if (Array.isArray(data)) setItems(data);
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', text: '', location: '', sortOrder: 0 }); setShowModal(true); };
  const openEdit = (item) => { setEditing(item._id); setForm({ name: item.name, text: item.text, location: item.location, sortOrder: item.sortOrder || 0 }); setShowModal(true); };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/testimonials/${editing}` : `${API_URL}/testimonials`;
    const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowModal(false); fetchItems(); showToast(editing ? 'Updated' : 'Created'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`${API_URL}/testimonials/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setItems(prev => prev.filter(i => i._id !== id));
    showToast('Deleted');
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <>
      <div className="admin-header">
        <div><h2>Testimonials</h2><p>Manage customer reviews</p></div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Testimonial</button>
      </div>
      <div className="admin-content">
        <div className="data-table-wrapper">
          <div className="table-header"><h3>All Testimonials ({items.length})</h3></div>
          {items.length > 0 ? (
            <table>
              <thead><tr><th>Name</th><th>Occupation</th><th>Review</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(i => (
                  <tr key={i._id}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{i.name}</td>
                    <td>{i.location}</td>
                    <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.text}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon" onClick={() => openEdit(i)}><Pencil size={15} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(i._id)}><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state"><Quote size={40} /><h3>No testimonials</h3><p>Add customer reviews.</p></div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3><button className="btn-icon" onClick={() => setShowModal(false)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group"><label>Name</label><input name="name" value={form.name} onChange={onChange} /></div>
                <div className="form-group"><label>Occupation</label><input name="location" value={form.location} onChange={onChange} /></div>
              </div>
              <div className="form-group"><label>Review Text</label><textarea name="text" value={form.text} onChange={onChange} /></div>
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

export default TestimonialsManager;
