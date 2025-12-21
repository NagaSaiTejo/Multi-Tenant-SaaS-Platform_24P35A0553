const express = require('express');
const router = express.Router();
// Placeholder routes
router.post('/register-tenant', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});
const { login } = require('../controllers/authController');
router.post('/login', login);
router.get('/me', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});
router.post('/logout', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});
module.exports = router;