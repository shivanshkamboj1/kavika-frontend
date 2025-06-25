const Content = require('../models/Photo')
const cloudinary = require('../config/cloudinary')
const fs = require('fs/promises')

// Helper to upload one file
const uploadFile = async (filePath, resourceType = 'image') => {
  const result = await cloudinary.uploader.upload(filePath, { resource_type: resourceType })
  await fs.unlink(filePath) // delete temp file
  return result.public_id
}

// POST /contents
exports.createContent = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Name is required!' })
    if (!req.files?.coverImage) return res.status(400).json({ message: 'Cover image is required!' })

    // Upload cover image
    const coverImage = await uploadFile(req.files.coverImage[0].path, 'image')

    // Upload optional images
    const image = req.files.images
      ? await Promise.all(req.files.images.map((img) => uploadFile(img.path, 'image')))
      : []

    // Upload optional videos
    const video = req.files.videos
      ? await Promise.all(req.files.videos.map((vid) => uploadFile(vid.path, 'video')))
      : []

    // Save to MongoDB
    const content = new Content({ name, coverImage, image, video })
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
    const { id } = req.params
    const { name, removeImageIds = [], removeVideoIds = [] } = req.body

    let content = await Content.findById(id)
    if (!content) return res.status(404).json({ message: 'Content not found!' })

    // Update name
    if (name) content.name = name

    // Replace cover image
    if (req.files?.coverImage?.[0]) {
      await cloudinary.uploader.destroy(content.coverImage, { resource_type: 'image' })
      content.coverImage = await uploadFile(req.files.coverImage[0].path, 'image')
    }

    // Append new images
    if (req.files?.images) {
      const newImages = await Promise.all(
        req.files.images.map((img) => uploadFile(img.path, 'image'))
      )
      content.image.push(...newImages)
    }

    // Append new videos
    if (req.files?.videos) {
      const newVideos = await Promise.all(
        req.files.videos.map((vid) => uploadFile(vid.path, 'video'))
      )
      content.video.push(...newVideos)
    }

    // Remove specified imageIds
    if (removeImageIds.length) {
      content.image = content.image.filter((imgId) => !removeImageIds.includes(imgId))
      await Promise.all(
        removeImageIds.map((imgId) => cloudinary.uploader.destroy(imgId, { resource_type: 'image' }))
      )
    }

    // Remove specified videoIds
    if (removeVideoIds.length) {
      content.video = content.video.filter((vidId) => !removeVideoIds.includes(vidId))
      await Promise.all(
        removeVideoIds.map((vidId) => cloudinary.uploader.destroy(vidId, { resource_type: 'video' }))
      )
    }

    await content.save()
    return res.status(200).json({ message: 'Content updated successfully!', content })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}
