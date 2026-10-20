const User = require('../models/userModel');
const Article = require('../models/articleModel');

// Gestion centralisée des erreurs Mongoose
const handleError = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Cet email est deja utilise' });
  }
  return res.status(500).json({ message: err.message });
};

// GET /api/users (filtre optionnel ?role=...)
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const users = await User.find(role ? { role } : {});
    res.status(200).json(users);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    }
    res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, age, role, bio, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Le nom et l'email sont requis" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Cet email est deja utilise' });
    }

    const user = await User.create({ name, email, age, role, bio, phone });
    res.status(201).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/users/:id (avec verification d'integrite referentielle)
const deleteUser = async (req, res) => {
  try {
    const hasArticles = await Article.findOne({ author: req.params.id });
    if (hasArticles) {
      return res.status(400).json({
        message: 'Impossible de supprimer un utilisateur ayant des articles publies'
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    }

    res.status(200).json({ message: 'Utilisateur supprime avec succes', id: req.params.id });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser };