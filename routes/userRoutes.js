const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUserProfile, getAllUsers} = require('../controllers/userController');
const {protect, adminOnly} = require('../middlewares/authMiddleware');

// Route pour l'enregistrement d'un nouvel utilisateur
router.post('/register', registerUser);
router.post('/login', loginUser);
// Route pour obtenir le profil de l'utilisateur connecté
router.get('/profile', protect, getUserProfile);
// Route pour obtenir tous les utilisateurs (accessible uniquement aux admins)
router.get('/', protect, adminOnly, getAllUsers);


router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;