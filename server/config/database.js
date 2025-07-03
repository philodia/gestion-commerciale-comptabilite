const mongoose = require('mongoose');

/**
 * Fonction asynchrone pour établir la connexion à la base de données MongoDB.
 * Elle utilise l'URI de connexion stockée dans les variables d'environnement.
 * En cas d'échec, elle affiche l'erreur et termine le processus du serveur.
 */
const connectDB = async () => {
  try {
    // Tente de se connecter à MongoDB avec l'URI du fichier .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Affiche un message de succès dans la console avec l'hôte de la base de données
    console.log(`[DATABASE] MongoDB connecté avec succès: ${conn.connection.host}`);
    
  } catch (err) {
    // En cas d'erreur de connexion, affiche le message d'erreur
    console.error(`[DATABASE] Erreur de connexion à MongoDB: ${err.message}`);

    // Quitte le processus du serveur avec un code d'échec (1)
    // C'est une étape cruciale car l'application ne peut pas fonctionner sans sa base de données.
    process.exit(1);
  }
};

module.exports = connectDB;