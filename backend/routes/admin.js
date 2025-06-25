// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const {adminLogin} = require('../controllers/auth')

// POST new content
router.post(
  '/',
  adminLogin
);


module.exports = router;
