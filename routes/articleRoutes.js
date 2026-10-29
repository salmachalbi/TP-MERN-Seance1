const express = require('express');
const router = express.Router();
const{getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, getMyArticles} = require('../controllers/articleController');
const {protect} = require('../middlewares/authMiddleware');
// The '/api/articles' prefix is defined in server.js.
// Consultation publique
router.get('/',  getAllArticles);
// Consultation des articles de l'utilisateur connecté (JWT requis)
router.get('/my-articles', protect, getMyArticles);
router.get('/:id', getArticleById);
// Creation, modification et suppression d'articles (routes protegees)
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);
module.exports = router;