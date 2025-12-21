const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { login, getCurrentUser } = require('../controllers/authController');

// Placeholder routes
router.post('/register-tenant', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});
module.exports = router;