// ===================================================================
// FICHIER DE CONFIGURATION PRINCIPAL DE L'APPLICATION EXPRESS
// ===================================================================

// --- Imports des modules ---
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config(); // Charge les variables d'environnement depuis .env

const connectDB = require('./config/database');

// --- Initialisation de l'application ---
const app = express();

// --- Connexion à la base de données ---
// On appelle la fonction que nous avons créée pour nous connecter à MongoDB
connectDB();

// --- Middlewares ---
// Un middleware est une fonction qui a accès à l'objet requête (req), l'objet réponse (res),
// et à la fonction middleware suivante dans le cycle requête-réponse de l'application.

// Active CORS (Cross-Origin Resource Sharing) pour autoriser les requêtes
// provenant de notre client React (qui tourne sur un port différent).
app.use(cors());

// Affiche les logs des requêtes HTTP dans la console en mode développement.
// 'dev' est un format de log prédéfini et concis.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware pour parser le corps des requêtes entrantes en JSON.
// Indispensable pour recevoir des données de notre client (ex: formulaires).
app.use(express.json());

// Middleware pour parser le corps des requêtes avec des données URL-encoded.
app.use(express.urlencoded({ extended: true }));


// --- Routes de l'API ---
// C'est ici que nous brancherons toutes nos routes plus tard.
// Pour l'instant, une route de "test" pour vérifier que l'API fonctionne.
app.get('/api', (req, res) => {
  res.status(200).json({ 
    message: 'Bienvenue sur l\'API de Gestion Commerciale & Comptabilité',
    status: 'success'
  });
});

// Exemples de comment les futures routes seront ajoutées :
/*
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
*/


// --- Gestion des Erreurs ---
// Middleware pour gérer les routes non trouvées (404).
// Il sera exécuté si aucune des routes ci-dessus ne correspond.
app.use((req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Middleware de gestion d'erreurs global.
// Il attrapera toutes les erreurs passées à `next(error)`.
// Notez les 4 arguments, c'est ce qui le désigne comme un middleware d'erreur pour Express.
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // En mode développement, on peut afficher la stack trace pour le débogage.
    // En production, il ne faut JAMAIS l'exposer.
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});


// --- Export de l'application ---
// On exporte l'instance `app` pour qu'elle puisse être utilisée par notre serveur HTTP (server.js).
module.exports = app;