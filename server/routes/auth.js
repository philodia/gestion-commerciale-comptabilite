// server/routes/auth.js

const express = require('express');
const router = express.Router();

// --- Importation des contrôleurs et middlewares ---
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth'); // On a besoin du middleware 'protect' pour une route

// ===================================================================
// DÉFINITION DES ROUTES D'AUTHENTIFICATION
// ===================================================================
// Le préfixe '/api/auth' sera ajouté dans le fichier app.js

/**
 * @route   POST /api/auth/register
 * @desc    Enregistrer (créer) un nouvel utilisateur
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Connecter un utilisateur et retourner un token JWT
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Récupérer les informations de l'utilisateur actuellement connecté
 * @access  Private (nécessite un token valide)
 * @usage   Cette route est très utile côté client pour vérifier si un token stocké
 *          est toujours valide au chargement de l'application.
 */
router.get('/me', protect, authController.getMe); // Notez l'utilisation du middleware 'protect'


/**
 * @route   POST /api/auth/forgot-password
 * @desc    Lancer le processus de réinitialisation de mot de passe (envoi d'email)
 * @access  Public
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @route   PATCH /api/auth/reset-password/:token
 * @desc    Réinitialiser le mot de passe avec un token reçu par email
 * @access  Public
 */
router.patch('/reset-password/:token', authController.resetPassword);


// --- Exportation du routeur ---
// Le routeur configuré est exporté pour être utilisé dans le fichier principal app.js
module.exports = router;