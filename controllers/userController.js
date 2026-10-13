const { estNonVide, estEmailValide } = require("../utils/validators");

let users = [
  { id: 1, name: "lina", email: "lina@gmail.com", role: "Admin" },
  { id: 2, name: "yousra", email: "yousra@gmail.com", role: "Admin" },
  { id: 3, name: "salma", email: "salma@gmail.com", role: "User" },
];

// GET /api/users?
const getAllUsers = (req, res) => {
  const { role } = req.query;
  let resultat = users;
  if (role) {
    // si le client a précisé ?role =...
    resultat = users.filter((a) => a.role === role);
  }
  res.json({ total: resultat.length, users: resultat });
};
// GET /api/users/:id
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((a) => a.id === id);
  if (!user) {
    return res.status(404).json({ error: `User ${id} introuvable` });
  }
  res.status(200).json(user);
};

let prochainId = 4;

// POST /api/users
const createUser = (req, res) => {
  const { name, email, role } = req.body;

  // Vérifier si le nom est vide ou invalide
  if (!estNonVide(name)) {
    return res.status(400).json({
      error: "Le nom est obligatoire et ne doit pas être vide.",
    });
  }

  // Vérifier si l'email est invalide
  if (!estEmailValide(email)) {
    return res.status(400).json({
      error: "L'email est invalide. Il doit contenir @ et un point.",
    });
  }
  const nouvelUser = { id: prochainId++, name, email, role };
  users.push(nouvelUser);
  res.status(201).json({ message: "Utilisateur créé", user: nouvelUser });
};

// DELETE /api/users/:id
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userExiste = users.some((a) => a.id === id);
  if (!userExiste) {
    return res
      .status(404)
      .json({ error: `Impossible de supprimer : user ${id} introuvable` });
  }
  // On filtre pour ne garder que les users ayant un ID différent
  users = users.filter((a) => a.id !== id);
  res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès` });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};