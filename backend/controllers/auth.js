// controllers/adminController.js
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Set the JWT as httpOnly cookie
      return res
        .status(200)
        .cookie('adminToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 1000, // 1 hour
          sameSite: 'Strict',
        })
        .json({ message: 'Login successful' });

    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
