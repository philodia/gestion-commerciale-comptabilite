// ===================================================================
// FICHIER DE CONFIGURATION PRINCIPAL DE L'APPLICATION EXPRESS
// ===================================================================

// --- Imports des modules ---
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); // NOUVEAU : pour parser les cookies
require('dotenv').config(); // Charge les variables d'environnement depuis .env

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth'); // NOUVEAU : Importation des routes d'authentification

// --- Initialisation de l'application ---
const app = express();

// --- Connexion à la base de données ---
connectDB();

// --- Middlewares ---
// Un middleware est une fonction qui a accès à l'objet requête (req), l'objet réponse (res),
// et à la fonction middleware suivante dans le cycle requête-réponse de l'application.

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // NOUVEAU : Utilisation du middleware cookie-parser


// --- Routes de l'API ---
// On "monte" le routeur d'authentification sur le chemin '/api/auth'.
// Toutes les requêtes commençant par '/api/auth' seront maintenant gérées par ce routeur.
app.use('/api/auth', authRoutes); // NOUVEAU

// MODIFIÉ : La route de test de base peut être supprimée ou conservée pour la vérification de statut.
app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'API en ligne et opérationnelle.'
  });
});

// Exemples de comment les futures routes seront ajoutées :
/*
const clientRoutes = require('./routes/clients');
app.use('/api/clients', clientRoutes);

const utilisateurRoutes = require('./routes/utilisateurs');
app.use('/api/utilisateurs', utilisateurRoutes);
*/


// --- Gestion des Erreurs ---
// ... (le reste du fichier reste inchangé) ...
app.use((req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});


// --- Export de l'application ---
module.exports = app;