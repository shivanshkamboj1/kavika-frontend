const multer = require('multer')
const path = require('path')
const fs = require('fs')

// ✅ Pick temp path based on environment
const tempDir = process.env.NODE_ENV === 'production'
  ? '/tmp'                           // Vercel writable temp directory
  : path.join(__dirname, '../uploads/tmp') // local dev temp directory

// ✅ Ensure directory exists in local dev
if (process.env.NODE_ENV !== 'production' && !fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

// ✅ Configure disk storage
const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

module.exports = multer({ storage })
