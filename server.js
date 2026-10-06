const express = require('express'); // 1. charger la bibliothèque Express
const app = express(); // 2. créer l'application : c'est notre serveur
const PORT = 3000;
app . use( express . json () ) ; // lit le corps JSON et le range dans req. body

// 3. une route : quand un client demande GET /, Express exécute cette fonction
app.get('/', (req, res) => {
  res.json({ message: "hi, je suis l'API du blog" });
});

// 4. démarrer le serveur : il attend les requêtes sur le port 3000
// Nos données. Elles reviennent à l’état initial à chaque redémarrage :
// MongoDB les rendra permanentes à la séance 3.
const articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];

//Étape 4 : un seul article
// GET /api/articles/:id -> l’article dont l’id vaut 2
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id); // "2" -> 2
  const article = articles.find(a => a.id === id);
  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }
  res.json(article);
});
// GET /api/articles -> tous les articles
// GET /api/articles?author=Aya -> tous les articles d’Aya
app.get('/api/articles', (req, res) => {

    const { author } = req.query;

    let resultat = articles;

    if (author) {
        resultat = articles.filter(a => a.author === author);
    }

    res.json({
        total: resultat.length,
        articles: resultat
    });
});

//Étape 6 : Créer un article avec POST
let prochainId = 4; // l’id du prochain article à créer 

app.post('/api/articles', (req, res) => {

    const { title, author } = req.body; 

    if (!title || !author) {
      // si title ou author est vide, on renvoie une erreur 400
        return res.status(400).json({
            error: "Le titre et l'auteur sont obligatoires"
        });
    }

    const nouvelArticle = {
        id: prochainId,
        title: title,
        author: author
    };

    prochainId++;

    articles.push(nouvelArticle);

    res.status(201).json({
        message: "Article créé",
        article: nouvelArticle
    });
});


/// Exercice 1:
//Liste des utilisateurs
const users = [
    {
        id: 1,
        name: "salma",
        email: "salma@gmail.com"
    },
    {
        id: 2,
        name: "Alma",
        email: "alma@gmail.com"
    },
    {
        id: 3,
        name: "omar",
        email: "omar@gmail.com"
    }
];


// Get/about
app.get('/about', (req, res) => {
    res.json({
        application: "API Blog",
        auteur: "Salma",
        version: "1.0"
    });
});



// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {

const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({
            error: "Utilisateur introuvable"
        });
    }
    res.json(user);
});

// GET /api/users/author?name=salma
app.get("/api/users", (req, res) => {
  const { name } = req.query;
  let resultat = users;
  if (name) {
    resultat = users.filter((a) => a.name === name);
  }
  res.json({ total: resultat.length, users: resultat });
});

// POST /contact
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;  
    if (!name || !email || !message) {
        return res.status(400).json({
            error: "Le nom, l'email et le message sont obligatoires"
        });
    }


    res.status(201).json({
        message: "Message reçu"
    });
});

app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});