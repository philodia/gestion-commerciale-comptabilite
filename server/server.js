// ===================================================================
// POINT D'ENTRÉE DU SERVEUR HTTP
// ===================================================================
// Ce fichier est uniquement responsable de la création et du lancement du serveur HTTP.
// Il importe la configuration complète de l'application depuis app.js
// et la fait écouter sur le port spécifié.

// --- Imports ---
const http = require('http'); // Module natif de Node.js pour créer un serveur
const app = require('./app'); // Notre application Express configurée


// --- Définition du Port ---
// Récupère le port depuis les variables d'environnement.
// Si process.env.PORT n'est pas défini (par exemple, si le fichier .env manque),
// il utilise 5001 comme valeur par défaut.
// Note : Pas besoin de require('dotenv').config() ici, car il a déjà été appelé
// dans app.js, qui est importé juste au-dessus.
const port = process.env.PORT || 5001;


// --- Création du Serveur HTTP ---
// On utilise le module http pour créer un serveur.
// On passe notre instance 'app' d'Express en paramètre.
// 'app' agira comme le gestionnaire de toutes les requêtes reçues par ce serveur.
const server = http.createServer(app);


// --- Lancement et Écoute du Serveur ---
// La méthode .listen() démarre le serveur et le fait écouter les connexions entrantes sur le port spécifié.
// Le second argument est une fonction "callback" qui est exécutée une fois que le serveur
// a bien démarré, nous permettant d'afficher un message de confirmation.
server.listen(port, () => {
  console.log(`[SERVER] Démarré et écoute sur le port ${port} en mode '${process.env.NODE_ENV}'`);
});