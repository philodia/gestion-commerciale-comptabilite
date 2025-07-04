// server/config/auth.js

// S'assure que les variables d'environnement du fichier .env sont bien chargées
require('dotenv').config();

/**
 * Fichier de configuration centralisé pour l'authentification.
 *
 * Ce fichier exporte un objet de configuration qui lit ses valeurs
 * à partir des variables d'environnement. C'est une bonne pratique
 * pour la sécurité et la flexibilité, car elle permet de modifier
 * les paramètres sans changer le code source.
 */
const authConfig = {
  /**
   * Configuration pour JSON Web Token (JWT).
   */
  jwt: {
    /**
     * La clé secrète utilisée pour signer et vérifier les tokens.
     * DOIT être une chaîne de caractères longue et complexe.
     * Lu depuis la variable d'environnement JWT_SECRET.
     */
    secret: process.env.JWT_SECRET,

    /**
     * La durée de validité du token.
     * Le format est une chaîne de caractères (ex: "1h", "1d", "7d").
     * Lu depuis la variable d'environnement JWT_EXPIRES_IN.
     */
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  /**
   * Configuration pour les cookies utilisés pour stocker le JWT.
   */
  cookie: {
    /**
     * Si true, le cookie ne peut pas être accédé via JavaScript côté client.
     * C'est une mesure de sécurité cruciale contre les attaques XSS.
     */
    httpOnly: true,

    /**
     * Si true, le cookie ne sera envoyé que sur des connexions HTTPS.
     * Doit être 'true' en production.
     */
    secure: process.env.NODE_ENV === 'production',

    /**
     * Contrôle si un cookie est envoyé avec les requêtes cross-site.
     * 'strict' offre la meilleure protection contre les attaques CSRF.
     */
    sameSite: 'strict',
  },

  /**
   * Configuration pour la fonctionnalité de réinitialisation de mot de passe.
   * (Préparation pour une future implémentation)
   */
  passwordReset: {
    /**
     * Durée de validité du token de réinitialisation en millisecondes.
     * Ici, 10 minutes par défaut (10 * 60 secondes * 1000 millisecondes).
     */
    tokenExpiresIn: 10 * 60 * 1000,
  },
};


// ----- VÉRIFICATION DE SÉCURITÉ CRITIQUE -----
// S'assure que l'application ne démarre pas avec un secret JWT non défini ou par défaut.
if (!authConfig.jwt.secret || authConfig.jwt.secret === 'VOTRE_SECRET_JWT_TRES_COMPLEXE_ET_DIFFICILE_A_DEVINER') {
  console.error("\n[ERREUR FATALE] La variable d'environnement JWT_SECRET n'est pas définie ou utilise la valeur par défaut.");
  console.error("Veuillez définir une clé secrète sécurisée dans votre fichier .env avant de lancer l'application.\n");
  // Arrête le processus Node.js pour empêcher un démarrage non sécurisé.
  process.exit(1);
}


module.exports = authConfig;