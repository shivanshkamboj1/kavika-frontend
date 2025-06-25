const multer = require('multer')
const path = require('path')
const fs = require('fs')

// ensure temp directory exists
const tempDir = path.join(__dirname, '../uploads/tmp')
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

module.exports = multer({ storage })
