const Content = require('../models/Photo')
const cloudinary = require('../config/cloudinary')
const fs = require('fs/promises')

// Helper to upload one file with quality options
const uploadFile = async (filePath, resourceType = 'image', opts = {}) => {
  const uploadOptions = { resource_type: resourceType, ...opts }
  const result = await cloudinary.uploader.upload(filePath, uploadOptions)
  await fs.unlink(filePath) // delete temp file
  return result.public_id
}

// Upload presets for different asset types
const UPLOAD_PRESETS = {
  // Cover image — auto:good preserves visual quality, auto format (WebP/AVIF), max 1600px
  coverImage: {
    quality: 'auto:good',
    fetch_format: 'auto',
    transformation: [{ width: 1600, crop: 'limit' }],
    folder: 'kavika/covers',
  },
  // Gallery images — auto:eco aggressively compresses without visible loss, max 1200px
  galleryImage: {
    quality: 'auto:eco',
    fetch_format: 'auto',
    transformation: [{ width: 1200, crop: 'limit' }],
    folder: 'kavika/gallery',
  },
  // Videos — auto:eco for smart video compression
  video: {
    quality: 'auto:eco',
    resource_type: 'video',
    folder: 'kavika/videos',
  },
}

// POST /contents
exports.createContent = async (req, res) => {
  try {
    const { name,packages  } = req.body
    const packagesArray = Array.isArray(packages) ? packages : packages ? [packages] : []
    if (!name) return res.status(400).json({ message: 'Name is required!' })
    if (!req.files?.coverImage) return res.status(400).json({ message: 'Cover image is required!' })

    // Upload cover image (high quality)
    const coverImage = await uploadFile(req.files.coverImage[0].path, 'image', UPLOAD_PRESETS.coverImage)

    // Upload optional images (compressed)
    const image = req.files.images
      ? await Promise.all(req.files.images.map((img) => uploadFile(img.path, 'image', UPLOAD_PRESETS.galleryImage)))
      : []

    // Upload optional videos (compressed)
    const video = req.files.videos
      ? await Promise.all(req.files.videos.map((vid) => uploadFile(vid.path, 'video', UPLOAD_PRESETS.video)))
      : []

    // Save to MongoDB
    const content = new Content({ name, coverImage, image, video,packages: packagesArray })
    await content.save()

    return res.status(201).json({ message: 'Content created!', content })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET /contents
exports.getContents = async (req, res) => {
  try {
    const contents = await Content.find()
    return res.status(200).json(contents)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching contents', error: error.message })
  }
}

// DELETE /contents/:id
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params
    const content = await Content.findById(id)
    if (!content) return res.status(404).json({ message: 'Content not found!' })

    const deleteFile = async (public_id, resource_type = 'image') => {
      await cloudinary.uploader.destroy(public_id, { resource_type })
    }

    // Delete cover image
    await deleteFile(content.coverImage, 'image')
    // Delete images
    for (const imgId of content.image) {
      await deleteFile(imgId, 'image')
    }
    // Delete videos
    for (const vidId of content.video) {
      await deleteFile(vidId, 'video')
    }

    await content.deleteOne()
    return res.status(200).json({ message: 'Content deleted successfully!' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// PUT /contents/:id
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, packages, removeImageIds = [], removeVideoIds = [] } = req.body;

    // Ensure removeImageIds and removeVideoIds are arrays
    let imageIds = removeImageIds;
    let videoIds = removeVideoIds;

    if (typeof imageIds === 'string') imageIds = [imageIds];
    if (typeof videoIds === 'string') videoIds = [videoIds];

    let content = await Content.findById(id);
    if (!content) return res.status(404).json({ message: 'Content not found!' });

    // Update name
    if (name) content.name = name;
    if (packages) {
      content.packages = Array.isArray(packages) ? packages : [packages];
    }

    // Replace cover image (high quality)
    if (req.files?.coverImage?.[0]) {
      await cloudinary.uploader.destroy(content.coverImage, { resource_type: 'image' });
      content.coverImage = await uploadFile(req.files.coverImage[0].path, 'image', UPLOAD_PRESETS.coverImage);
    }

    // Append new images (compressed)
    if (req.files?.images) {
      const newImages = await Promise.all(
        req.files.images.map((img) => uploadFile(img.path, 'image', UPLOAD_PRESETS.galleryImage))
      );
      content.image.push(...newImages);
    }

    // Append new videos (compressed)
    if (req.files?.videos) {
      const newVideos = await Promise.all(
        req.files.videos.map((vid) => uploadFile(vid.path, 'video', UPLOAD_PRESETS.video))
      );
      content.video.push(...newVideos);
    }

    // Remove specified imageIds
    if (imageIds.length) {
      content.image = content.image.filter((imgId) => !imageIds.includes(imgId));
      await Promise.all(
        imageIds.map((imgId) =>
          cloudinary.uploader.destroy(imgId, { resource_type: 'image' })
        )
      );
    }

    // Remove specified videoIds
    if (videoIds.length) {
      content.video = content.video.filter((vidId) => !videoIds.includes(vidId));
      await Promise.all(
        videoIds.map((vidId) =>
          cloudinary.uploader.destroy(vidId, { resource_type: 'video' })
        )
      );
    }

    await content.save();
    return res.status(200).json({ message: 'Content updated successfully!', content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
