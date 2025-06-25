// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const { createContent, getContents, deleteContent, updateContent } = require('../controllers/ContentLogic');
const upload = require('../utils/multer');

// POST new content
router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
  ]),
  createContent
);

// GET all contents
router.get('/', getContents);

// DELETE content
router.delete('/:id', deleteContent);

// UPDATE content
router.put(
  '/:id',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
  ]),
  updateContent
);

module.exports = router;
