import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchContents = () => {
    fetch(`${apiUrl}/contents`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setContents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this destination?')) return;
    try {
      const res = await fetch(`${apiUrl}/contents/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        fetchContents();
      } else {
        alert('Failed to delete');
      }
    } catch {
      alert('Error deleting');
    }
  };

  const handleLogout = () => {
    // Clear cookie by navigating away
    document.cookie = 'adminToken=; Max-Age=0; path=/;';
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-muted-foreground">
        <div className="w-12 h-12 border-4 border-t-primary border-muted rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <section className="px-6 md:px-8 py-12 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">Admin</p>
          <h1 className="font-display text-4xl">Manage Destinations</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            + New Destination
          </button>
          <button
            onClick={handleLogout}
            className="border border-border px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-muted transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <ContentForm
          apiUrl={apiUrl}
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={() => { setShowForm(false); setEditing(null); fetchContents(); }}
        />
      )}

      {/* Table */}
      <div className="bg-card rounded-2xl ring-1 ring-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">Cover</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Images</th>
                <th className="px-6 py-4 font-semibold">Videos</th>
                <th className="px-6 py-4 font-semibold">Packages</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contents.map((c) => (
                <tr key={c._id}>
                  <td className="px-6 py-4">
                    <img
                      src={`https://res.cloudinary.com/${cloudName}/image/upload/w_80,h_60,c_fill/${c.coverImage}.jpg`}
                      alt={c.name}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium capitalize">{c.name}</td>
                  <td className="px-6 py-4">{c.image?.length || 0}</td>
                  <td className="px-6 py-4">{c.video?.length || 0}</td>
                  <td className="px-6 py-4">{c.packages?.join(', ') || '—'}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => { setEditing(c); setShowForm(true); }}
                      className="text-primary font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-destructive font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {contents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No destinations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">← Back to site</Link>
      </p>
    </section>
  );
};

function ContentForm({ apiUrl, initial, onClose, onSaved }) {
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Ensure packages field is properly formatted
    const packagesVal = fd.get('packages')?.toString().trim();
    fd.delete('packages');
    if (packagesVal) {
      packagesVal.split(',').map(p => p.trim()).filter(Boolean).forEach(p => fd.append('packages', p));
    }

    if (!fd.get('name')?.toString().trim()) {
      alert('Name is required');
      return;
    }

    // For new content, coverImage is required
    if (!initial && (!fd.get('coverImage') || fd.get('coverImage').size === 0)) {
      alert('Cover image is required');
      return;
    }

    // Remove empty file inputs to avoid backend errors
    if (fd.get('coverImage') && fd.get('coverImage').size === 0) {
      fd.delete('coverImage');
    }

    setBusy(true);

    try {
      const url = initial ? `${apiUrl}/contents/${initial._id}` : `${apiUrl}/contents`;
      const method = initial ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Error saving');
      } else {
        onSaved();
      }
    } catch {
      alert('Error saving');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-card p-6 md:p-8 rounded-2xl ring-1 ring-border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="md:col-span-2 font-display text-2xl mb-2">{initial ? 'Edit Destination' : 'New Destination'}</h2>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Name</label>
        <input
          name="name"
          defaultValue={initial?.name}
          required
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Packages (comma-separated)</label>
        <input
          name="packages"
          defaultValue={initial?.packages?.join(', ')}
          placeholder="e.g. 3N/4D Shimla, 5N/6D Manali"
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Cover Image</label>
        <input
          name="coverImage"
          type="file"
          accept="image/*"
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Additional Images</label>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary"
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Videos</label>
        <input
          name="videos"
          type="file"
          accept="video/*"
          multiple
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary"
        />
      </div>

      <div className="md:col-span-2 flex gap-3">
        <button
          disabled={busy}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {busy ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="border border-border px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-muted transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Admin;
