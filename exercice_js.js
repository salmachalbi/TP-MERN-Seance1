//Exercise 2: Essential JavaScript Idioms
const produits = [
    { nom: 'Clavier', prix: 45 },
    { nom: 'Écran', prix: 320 },
    { nom: 'Souris', prix: 25 }
];

//Question 1 : Déstructuration
const {nom , prix} = produits[0];
console.log(nom, prix);

//Question 2 : Trouver Souris avec find
const souris = produits.find(produit => produit.nom === 'Souris');
console.log(souris);
//Question 3 : Filtrer les produits avec un prix inférieur à 100
const produitsMoinsDe100 = produits.filter(produit => produit.prix < 100);
console.log(produitsMoinsDe100);
//Question 4 : Fontion fléchée avecReduction 10%
const avecRemise = prix => prix * 0.9;
console.log(avecRemise(320));

