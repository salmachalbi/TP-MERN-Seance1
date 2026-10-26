const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Routes publiques d'authentification
router.post('/register', registerUser);
router.post('/login', loginUser);

// Route privée (JWT requis)
router.get('/profile', protect, getUserProfile);

// Route réservée aux administrateurs (JWT valide + rôle admin)
router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;