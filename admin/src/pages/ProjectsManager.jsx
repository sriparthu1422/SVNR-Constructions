import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyProject = {
  name: '', location: '', projectType: 'live', image: '', description: '',
  stage: '', progress: 0, completion: '', completionYear: '', totalUnits: 0,
  area: '', testimonial: '', size: '', launch: '', concept: '', sortOrder: 0,
};

const ProjectsManager = () => {
  const { token, API_URL } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [toast, setToast] = useState(null);

  const fetchProjects = async () => {
    const url = filter === 'all' ? `${API_URL}/projects` : `${API_URL}/projects?type=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    if (Array.isArray(data)) setProjects(data);
  };

  useEffect(() => { fetchProjects(); }, [filter]);

  const openCreate = () => { setEditing(null); setForm(emptyProject); setShowModal(true); };
  const openEdit = (p) => { setEditing(p._id); setForm({ ...emptyProject, ...p }); setShowModal(true); };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/projects/${editing}` : `${API_URL}/projects`;
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowModal(false);
      fetchProjects();
      showToast(editing ? 'Project updated' : 'Project created');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setProjects(prev => prev.filter(p => p._id !== id));
      showToast('Project deleted');
    }
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <>
      <div className="admin-header">
        <div>
          <h2>Projects</h2>
          <p>Manage live, delivered, and upcoming projects</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Project</button>
      </div>
      <div className="admin-content">
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['all', 'live', 'delivered', 'upcoming'].map(f => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="data-table-wrapper">
          <div className="table-header"><h3>All Projects ({projects.length})</h3></div>
          {projects.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Progress</th><th>Actions</th></tr></thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p._id}>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{p.name}</td>
                      <td>{p.location}</td>
                      <td><span className={`badge badge-${p.projectType}`}>{p.projectType}</span></td>
                      <td>{p.projectType === 'live' ? `${p.progress}%` : p.projectType === 'delivered' ? p.completionYear : p.launch}</td>
                      <td style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-icon" onClick={() => openEdit(p)}><Pencil size={15} /></button>
                        <button className="btn-icon danger" onClick={() => handleDelete(p._id)}><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state"><Building2 size={40} /><h3>No projects found</h3><p>Add your first project.</p></div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group"><label>Name</label><input name="name" value={form.name} onChange={onChange} /></div>
                <div className="form-group"><label>Location</label><input name="location" value={form.location} onChange={onChange} /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select name="projectType" value={form.projectType} onChange={onChange}>
                    <option value="live">Live</option>
                    <option value="delivered">Delivered</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="form-group"><label>Sort Order</label><input name="sortOrder" type="number" value={form.sortOrder} onChange={onChange} /></div>
              </div>
              <div className="form-group"><label>Image URL</label><input name="image" value={form.image} onChange={onChange} /></div>
              <div className="form-group"><label>Description</label><textarea name="description" value={form.description} onChange={onChange} /></div>

              {form.projectType === 'live' && (
                <div className="form-row">
                  <div className="form-group"><label>Stage</label><input name="stage" value={form.stage} onChange={onChange} /></div>
                  <div className="form-group"><label>Progress (%)</label><input name="progress" type="number" value={form.progress} onChange={onChange} /></div>
                  <div className="form-group"><label>Completion</label><input name="completion" value={form.completion} onChange={onChange} /></div>
                </div>
              )}
              {form.projectType === 'delivered' && (
                <div className="form-row">
                  <div className="form-group"><label>Completion Year</label><input name="completionYear" value={form.completionYear} onChange={onChange} /></div>
                  <div className="form-group"><label>Total Units</label><input name="totalUnits" type="number" value={form.totalUnits} onChange={onChange} /></div>
                  <div className="form-group"><label>Area</label><input name="area" value={form.area} onChange={onChange} /></div>
                </div>
              )}
              {form.projectType === 'upcoming' && (
                <div className="form-row">
                  <div className="form-group"><label>Size</label><input name="size" value={form.size} onChange={onChange} /></div>
                  <div className="form-group"><label>Launch</label><input name="launch" value={form.launch} onChange={onChange} /></div>
                  <div className="form-group"><label>Concept</label><input name="concept" value={form.concept} onChange={onChange} /></div>
                </div>
              )}
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

export default ProjectsManager;
