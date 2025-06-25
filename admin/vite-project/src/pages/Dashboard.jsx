import { useState, useEffect } from 'react';

export default function Dashboard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const [contents, setContents] = useState([]);
  const [name, setName] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null); // NEW cover image
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  // Edit states
  const [isEditing, setIsEditing] = useState(null); 
  const [editName, setEditName] = useState('');
  const [editCoverFile, setEditCoverFile] = useState(null); // optional new cover
  const [editImages, setEditImages] = useState([]);
  const [editVideos, setEditVideos] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/contents`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setContents(data));
  }, [apiUrl]);

  const reloadContents = async () => {
    const data = await fetch(`${apiUrl}/contents`, { credentials: 'include' }).then((r) => r.json());
    setContents(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!coverImageFile) {
      return alert('Cover image is required');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('coverImage', coverImageFile); // cover image
    Array.from(imageFiles).forEach((img) => formData.append('images', img));
    Array.from(videoFiles).forEach((vid) => formData.append('videos', vid));

    const res = await fetch(`${apiUrl}/contents`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (res.ok) {
      setName('');
      setCoverImageFile(null);
      setImageFiles([]);
      setVideoFiles([]);
      reloadContents();
    } else {
      const err = await res.json();
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this content?')) {
      const res = await fetch(`${apiUrl}/contents/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) reloadContents();
    }
  };

  const handleEditClick = (content) => {
    setIsEditing(content._id);
    setEditName(content.name);
    setEditCoverFile(null);
    setEditImages([]);
    setEditVideos([]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (editName) formData.append('name', editName);
    if (editCoverFile) formData.append('coverImage', editCoverFile); // optional new cover
    Array.from(editImages).forEach((img) => formData.append('images', img));
    Array.from(editVideos).forEach((vid) => formData.append('videos', vid));

    const res = await fetch(`${apiUrl}/contents/${isEditing}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    });

    if (res.ok) {
      setIsEditing(null);
      setEditName('');
      setEditCoverFile(null);
      setEditImages([]);
      setEditVideos([]);
      reloadContents();
    } else {
      alert('Error updating content.');
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Add new */}
      <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow mb-4 space-y-2">
        <input
          placeholder="Content name"
          className="w-full border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Cover Image (required)</label>
        <input
          type="file"
          className="w-full"
          accept="image/*"
          onChange={(e) => setCoverImageFile(e.target.files[0])}
          required
        />
        <label>Additional Images</label>
        <input
          type="file"
          className="w-full"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(e.target.files)}
        />
        <label>Videos</label>
        <input
          type="file"
          className="w-full"
          accept="video/*"
          multiple
          onChange={(e) => setVideoFiles(e.target.files)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Content</button>
      </form>

      {/* list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contents.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded shadow relative">
            {isEditing === c._id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  className="w-full border p-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <label>New Cover Image</label>
                <input
                  type="file"
                  className="w-full"
                  accept="image/*"
                  onChange={(e) => setEditCoverFile(e.target.files[0])}
                />
                <label>New Images</label>
                <input
                  type="file"
                  className="w-full"
                  accept="image/*"
                  multiple
                  onChange={(e) => setEditImages(e.target.files)}
                />
                <label>New Videos</label>
                <input
                  type="file"
                  className="w-full"
                  accept="video/*"
                  multiple
                  onChange={(e) => setEditVideos(e.target.files)}
                />
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">{c.name}</h3>
                {/* Cover image */}
                {c.coverImage && (
                  <img
                    src={`https://res.cloudinary.com/${cloudName}/image/upload/${c.coverImage}.jpg`}
                    className="w-full h-40 object-cover mb-2"
                    alt={c.name}
                  />
                )}
                {/* Images */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {c.image &&
                    c.image.map((imgId) => (
                      <img
                        key={imgId}
                        src={`https://res.cloudinary.com/${cloudName}/image/upload/${imgId}.jpg`}
                        className="w-full h-32 object-cover"
                        alt={c.name}
                      />
                    ))}
                </div>
                {/* Videos */}
                <div className="grid grid-cols-1 gap-2 mb-2">
                  {c.video &&
                    c.video.map((vidId) => (
                      <video key={vidId} className="w-full h-32 object-cover" controls>
                        <source src={`https://res.cloudinary.com/${cloudName}/video/upload/${vidId}.mp4`} type="video/mp4" />
                      </video>
                    ))}
                </div>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEditClick(c)}
                    className="bg-blue-500 text-white flex-1 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white flex-1 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
