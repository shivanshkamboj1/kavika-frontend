// middlewares/isAdmin.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username !== process.env.ADMIN_USERNAME) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
