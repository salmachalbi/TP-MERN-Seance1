const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
// The '/api/articles' prefix is defined in server.js.
// Here, '/' represents the root of the '/api/articles' resource.
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
module.exports = router;