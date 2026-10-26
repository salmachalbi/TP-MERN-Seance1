const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 1. Protection des routes privées : vérifie la validité du JWT
const protect = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non autorise, aucun token fourni' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Utilisateur associé (sans le mot de passe)
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Non autorise, utilisateur introuvable' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Non autorise, token invalide ou expire' });
  }
};

// 2. Contrôle d'accès par rôle (RBAC) : réservé aux admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Acces refuse : droits administrateur requis' });
};

module.exports = { protect, adminOnly };