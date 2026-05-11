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
          cloudName={cloudName}
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
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {c.packages?.length ? c.packages.map((pkg, i) => (
                        <span key={i} className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {pkg}
                        </span>
                      )) : <span className="text-muted-foreground">—</span>}
                    </div>
                  </td>
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

function ContentForm({ apiUrl, cloudName, initial, onClose, onSaved }) {
  const [busy, setBusy] = useState(false);
  const [packages, setPackages] = useState(initial?.packages?.length ? initial.packages : ['']);
  const [removeImageIds, setRemoveImageIds] = useState([]);
  const [removeVideoIds, setRemoveVideoIds] = useState([]);

  // Existing media (only when editing)
  const existingImages = initial?.image || [];
  const existingVideos = initial?.video || [];
  const existingCover = initial?.coverImage || null;

  const addPackage = () => setPackages([...packages, '']);
  const removePackage = (idx) => setPackages(packages.filter((_, i) => i !== idx));
  const updatePackage = (idx, val) => {
    const next = [...packages];
    next[idx] = val;
    setPackages(next);
  };

  const toggleRemoveImage = (publicId) => {
    setRemoveImageIds((prev) =>
      prev.includes(publicId) ? prev.filter((id) => id !== publicId) : [...prev, publicId]
    );
  };

  const toggleRemoveVideo = (publicId) => {
    setRemoveVideoIds((prev) =>
      prev.includes(publicId) ? prev.filter((id) => id !== publicId) : [...prev, publicId]
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Remove leftover package_* fields (we handle them manually)
    for (const key of [...fd.keys()]) {
      if (key.startsWith('package_')) fd.delete(key);
    }

    // Append cleaned packages
    const cleanPkgs = packages.map((p) => p.trim()).filter(Boolean);
    cleanPkgs.forEach((p) => fd.append('packages', p));

    // Append removal IDs for existing media
    removeImageIds.forEach((id) => fd.append('removeImageIds', id));
    removeVideoIds.forEach((id) => fd.append('removeVideoIds', id));

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
    // Clean empty images/videos file inputs
    const imgFiles = fd.getAll('images');
    if (imgFiles.length === 1 && imgFiles[0].size === 0) fd.delete('images');
    const vidFiles = fd.getAll('videos');
    if (vidFiles.length === 1 && vidFiles[0].size === 0) fd.delete('videos');

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

  const imgUrl = (publicId, transform = 'w_200,h_150,c_fill') =>
    `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}.jpg`;
  const vidThumb = (publicId) =>
    `https://res.cloudinary.com/${cloudName}/video/upload/w_200,h_150,c_fill,so_1/${publicId}.jpg`;

  return (
    <form onSubmit={submit} className="bg-card p-6 md:p-8 rounded-2xl ring-1 ring-border mb-8 space-y-6">
      <h2 className="font-display text-2xl">{initial ? 'Edit Destination' : 'New Destination'}</h2>

      {/* ── Name ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Name</label>
        <input
          name="name"
          defaultValue={initial?.name}
          required
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary max-w-md"
        />
      </div>

      {/* ── Packages: dynamic add/remove ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Packages</label>
        <div className="space-y-2 max-w-lg">
          {packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                name={`package_${idx}`}
                value={pkg}
                onChange={(e) => updatePackage(idx, e.target.value)}
                placeholder={`e.g. 3N/4D Shimla ₹10,000`}
                className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="shrink-0 size-9 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-lg font-bold"
                  title="Remove package"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPackage}
          className="self-start flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
        >
          <span className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-sm">+</span>
          Add Package
        </button>
      </div>

      {/* ── Cover Image ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Cover Image {initial && '(upload to replace)'}
        </label>
        {existingCover && (
          <div className="flex items-center gap-4">
            <img src={imgUrl(existingCover)} alt="Current cover" className="w-24 h-18 object-cover rounded-lg ring-1 ring-border" />
            <span className="text-xs text-muted-foreground">Current cover</span>
          </div>
        )}
        <input
          name="coverImage"
          type="file"
          accept="image/*"
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary max-w-md"
        />
      </div>

      {/* ── Existing Images (edit mode) ── */}
      {initial && existingImages.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Existing Images
            {removeImageIds.length > 0 && (
              <span className="ml-2 text-destructive normal-case tracking-normal">
                ({removeImageIds.length} marked for removal)
              </span>
            )}
          </label>
          <div className="flex flex-wrap gap-3">
            {existingImages.map((publicId) => {
              const markedForRemoval = removeImageIds.includes(publicId);
              return (
                <div key={publicId} className="relative group">
                  <img
                    src={imgUrl(publicId)}
                    alt="Destination image"
                    className={`w-28 h-20 object-cover rounded-lg ring-1 ring-border transition-all ${
                      markedForRemoval ? 'opacity-30 grayscale' : ''
                    }`}
                  />
                  {markedForRemoval && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-destructive font-bold text-xs bg-card/90 px-2 py-1 rounded-full">REMOVING</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleRemoveImage(publicId)}
                    className={`absolute -top-2 -right-2 size-6 flex items-center justify-center rounded-full text-xs font-bold shadow-md transition-all ${
                      markedForRemoval
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        : 'bg-destructive text-white hover:bg-destructive/80'
                    }`}
                    title={markedForRemoval ? 'Undo removal' : 'Mark for removal'}
                  >
                    {markedForRemoval ? '↩' : '×'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Add New Images ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {initial ? 'Add More Images' : 'Images'}
        </label>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary max-w-md"
        />
      </div>

      {/* ── Existing Videos (edit mode) ── */}
      {initial && existingVideos.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Existing Videos
            {removeVideoIds.length > 0 && (
              <span className="ml-2 text-destructive normal-case tracking-normal">
                ({removeVideoIds.length} marked for removal)
              </span>
            )}
          </label>
          <div className="flex flex-wrap gap-3">
            {existingVideos.map((publicId) => {
              const markedForRemoval = removeVideoIds.includes(publicId);
              return (
                <div key={publicId} className="relative group">
                  <div
                    className={`w-36 h-24 rounded-lg ring-1 ring-border overflow-hidden transition-all ${
                      markedForRemoval ? 'opacity-30 grayscale' : ''
                    }`}
                  >
                    <img
                      src={vidThumb(publicId)}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('bg-muted', 'flex', 'items-center', 'justify-center');
                        e.target.parentElement.innerHTML = '<span class="text-[10px] text-muted-foreground font-mono uppercase">Video</span>';
                      }}
                    />
                  </div>
                  {markedForRemoval && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-destructive font-bold text-xs bg-card/90 px-2 py-1 rounded-full">REMOVING</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleRemoveVideo(publicId)}
                    className={`absolute -top-2 -right-2 size-6 flex items-center justify-center rounded-full text-xs font-bold shadow-md transition-all ${
                      markedForRemoval
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        : 'bg-destructive text-white hover:bg-destructive/80'
                    }`}
                    title={markedForRemoval ? 'Undo removal' : 'Mark for removal'}
                  >
                    {markedForRemoval ? '↩' : '×'}
                  </button>
                  <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate max-w-[144px]" title={publicId}>
                    {publicId.split('/').pop()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Add New Videos ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {initial ? 'Add More Videos' : 'Videos'}
        </label>
        <input
          name="videos"
          type="file"
          accept="video/*"
          multiple
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary max-w-md"
        />
      </div>

      {/* ── Actions ── */}
      <div className="flex gap-3 pt-2 border-t border-border">
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
        {(removeImageIds.length > 0 || removeVideoIds.length > 0) && (
          <span className="self-center text-xs text-destructive font-medium ml-auto">
            ⚠ {removeImageIds.length + removeVideoIds.length} media file(s) will be permanently deleted on save
          </span>
        )}
      </div>
    </form>
  );
}

export default Admin;

