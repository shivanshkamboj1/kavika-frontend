import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const [contents, setContents] = useState([]);
  const [name, setName] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [packages, setPackages] = useState(['']);

  // Edit states
  const [isEditing, setIsEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCoverFile, setEditCoverFile] = useState(null);
  const [editImages, setEditImages] = useState([]);
  const [editVideos, setEditVideos] = useState([]);
  const [editPackages, setEditPackages] = useState([]);

  // New states for marking removals
  const [removeImageIds, setRemoveImageIds] = useState([]);
  const [removeVideoIds, setRemoveVideoIds] = useState([]);

  useEffect(() => {
    reloadContents();
  }, [apiUrl]);

  const reloadContents = async () => {
    const data = await fetch(`${apiUrl}/contents`, { credentials: 'include' })
      .then((r) => r.json());
    setContents(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!coverImageFile) return toast.error('Cover image is required');

    const toastId = toast.loading('Uploading...');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('coverImage', coverImageFile);
      Array.from(imageFiles).forEach((img) => formData.append('images', img));
      Array.from(videoFiles).forEach((vid) => formData.append('videos', vid));
      Array.from(packages).forEach((pkg) => formData.append('packages', pkg));

      const res = await fetch(`${apiUrl}/contents`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      toast.dismiss(toastId);

      if (res.ok) {
        toast.success('Content uploaded successfully!');
        setName('');
        setCoverImageFile(null);
        setImageFiles([]);
        setVideoFiles([]);
        setPackages(['']);
        reloadContents();
      } else {
        const err = await res.json();
        toast.error(`Error: ${err.message || 'Upload failed'}`);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Error uploading content.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this content?')) {
      const toastId = toast.loading('Deleting...');
      const res = await fetch(`${apiUrl}/contents/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      toast.dismiss(toastId);
      if (res.ok) {
        toast.success('Deleted successfully');
        reloadContents();
      } else {
        toast.error('Error deleting content.');
      }
    }
  };

  const handleEditClick = (content) => {
    setIsEditing(content._id);
    setEditName(content.name);
    setEditCoverFile(null);
    setEditImages([]);
    setEditVideos([]);
    setEditPackages(content.packages || []);
    setRemoveImageIds([]);
    setRemoveVideoIds([]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Updating...');
    try {
      const formData = new FormData();
      if (editName) formData.append('name', editName);
      if (editCoverFile) formData.append('coverImage', editCoverFile);
      Array.from(editImages).forEach((img) => formData.append('images', img));
      Array.from(editVideos).forEach((vid) => formData.append('videos', vid));
      Array.from(editPackages).forEach((pkg) => formData.append('packages', pkg));
      removeImageIds.forEach((id) => formData.append('removeImageIds', id));
      removeVideoIds.forEach((id) => formData.append('removeVideoIds', id));

      const res = await fetch(`${apiUrl}/contents/${isEditing}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      toast.dismiss(toastId);

      if (res.ok) {
        toast.success('Updated successfully!');
        setIsEditing(null);
        setEditName('');
        setEditCoverFile(null);
        setEditImages([]);
        setEditVideos([]);
        setEditPackages([]);
        setRemoveImageIds([]);
        setRemoveVideoIds([]);
        reloadContents();
      } else {
        toast.error('Error updating content.');
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Error updating content.');
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

        <label>Packages</label>
        {packages.map((pkg, index) => (
          <input
            key={index}
            className="w-full border p-2 mb-1"
            placeholder="e.g. 3 nights 2 days 5000rs"
            value={pkg}
            onChange={(e) => {
              const newPackages = [...packages];
              newPackages[index] = e.target.value;
              setPackages(newPackages);
            }}
          />
        ))}
        <button
          type="button"
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => setPackages((prev) => [...prev, ''])}
        >
          + Add Another Package
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Content</button>
      </form>

      {/* List */}
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

                <label>Edit Packages</label>
                {editPackages.map((pkg, index) => (
                  <input
                    key={index}
                    className="w-full border p-2 mb-1"
                    value={pkg}
                    onChange={(e) => {
                      const newPackages = [...editPackages];
                      newPackages[index] = e.target.value;
                      setEditPackages(newPackages);
                    }}
                  />
                ))}
                <button
                  type="button"
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => setEditPackages((prev) => [...prev, ''])}
                >
                  + Add Another Package
                </button>

                {c.image?.length > 0 && (
                  <div>
                    <label className="block font-semibold">Existing Images</label>
                    <div className="grid grid-cols-2 gap-2">
                      {c.image.map((imgId) => (
                        <div key={imgId} className="relative">
                          <img
                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${imgId}.jpg`}
                            className="w-full h-32 object-cover rounded"
                            alt="existing"
                          />
                          <label className="flex items-center mt-1 text-sm">
                            <input
                              type="checkbox"
                              checked={removeImageIds.includes(imgId)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setRemoveImageIds((prev) => [...prev, imgId]);
                                } else {
                                  setRemoveImageIds((prev) => prev.filter((id) => id !== imgId));
                                }
                              }}
                            />
                            <span className="ml-2">Remove</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {c.video?.length > 0 && (
                  <div>
                    <label className="block font-semibold">Existing Videos</label>
                    <div className="grid grid-cols-1 gap-2">
                      {c.video.map((vidId) => (
                        <div key={vidId} className="relative">
                          <video
                            className="w-full h-32 object-cover rounded"
                            controls
                          >
                            <source
                              src={`https://res.cloudinary.com/${cloudName}/video/upload/${vidId}.mp4`}
                              type="video/mp4"
                            />
                          </video>
                          <label className="flex items-center mt-1 text-sm">
                            <input
                              type="checkbox"
                              checked={removeVideoIds.includes(vidId)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setRemoveVideoIds((prev) => [...prev, vidId]);
                                } else {
                                  setRemoveVideoIds((prev) => prev.filter((id) => id !== vidId));
                                }
                              }}
                            />
                            <span className="ml-2">Remove</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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

                {c.coverImage && (
                  <img
                    src={`https://res.cloudinary.com/${cloudName}/image/upload/${c.coverImage}.jpg`}
                    className="w-full h-40 object-cover mb-2"
                    alt={c.name}
                  />
                )}

                <div className="grid grid-cols-2 gap-2 mb-2">
                  {c.image?.map((imgId) => (
                    <img
                      key={imgId}
                      src={`https://res.cloudinary.com/${cloudName}/image/upload/${imgId}.jpg`}
                      className="w-full h-32 object-cover"
                      alt={c.name}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-2 mb-2">
                  {c.video?.map((vidId) => (
                    <video key={vidId} className="w-full h-32 object-cover" controls>
                      <source
                        src={`https://res.cloudinary.com/${cloudName}/video/upload/${vidId}.mp4`}
                        type="video/mp4"
                      />
                    </video>
                  ))}
                </div>

                {c.packages && c.packages.length > 0 && (
                  <ul className="list-disc list-inside mb-2 text-sm text-gray-700">
                    {c.packages.map((pkg, idx) => (
                      <li key={idx}>{pkg}</li>
                    ))}
                  </ul>
                )}

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
