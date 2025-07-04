// server/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth'); // NOUVEAU : Import de la configuration

// --- FONCTIONS UTILITAIRES (Mises à jour) ---

/**
 * Crée et signe un JSON Web Token en utilisant la configuration centralisée.
 */
const signToken = (id) => {
  // MODIFIÉ : Utilise les valeurs de authConfig
  return jwt.sign({ id }, authConfig.jwt.secret, {
    expiresIn: authConfig.jwt.expiresIn,
  });
};

/**
 * Centralise la logique d'envoi du token et des données utilisateur en réponse.
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // MODIFIÉ : Calcule la date d'expiration à partir de la configuration
  const expiresInString = authConfig.jwt.expiresIn;
  let expirationDate;
  if (expiresInString.endsWith('d')) {
    const days = parseInt(expiresInString.replace('d', ''));
    expirationDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  } else if (expiresInString.endsWith('h')) {
    const hours = parseInt(expiresInString.replace('h', ''));
    expirationDate = new Date(Date.now() + hours * 60 * 60 * 1000);
  } else {
    // Fallback à 1 jour si le format est inconnu
    expirationDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  }

  const cookieOptions = {
    expires: expirationDate,
    // MODIFIÉ : Utilise les valeurs de authConfig
    httpOnly: authConfig.cookie.httpOnly,
    secure: authConfig.cookie.secure,
    sameSite: authConfig.cookie.sameSite,
  };

  res.cookie('jwt', token, cookieOptions);

  // Supprime le mot de passe de l'objet utilisateur avant de l'envoyer
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};


// ===================================================================
// FONCTIONS DU CONTRÔLEUR (Code inchangé, mais il bénéficie des mises à jour ci-dessus)
// ===================================================================

exports.register = async (req, res, next) => {
  try {
    const { nom, email, password, role } = req.body;
    if (!nom || !email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Veuillez fournir un nom, un email et un mot de passe.' });
    }
    const newUser = await User.create({ nom, email, password, role });
    createSendToken(newUser, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ status: 'fail', message: 'Cette adresse email est déjà utilisée.' });
    }
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Veuillez fournir votre email et votre mot de passe.' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: 'fail', message: 'Email ou mot de passe incorrect.' });
    }
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Une erreur interne est survenue.' });
  }
};

exports.getMe = async (req, res) => {
  // Le middleware 'protect' a déjà ajouté req.user
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
};


// ===================================================================
// FONCTIONNALITÉS FUTURES
// ===================================================================
exports.forgotPassword = async (req, res) => {
  res.status(501).json({ status: 'error', message: 'Cette fonctionnalité n\'est pas encore implémentée.' });
};

exports.resetPassword = async (req, res) => {
  res.status(501).json({ status: 'error', message: 'Cette fonctionnalité n\'est pas encore implémentée.' });
};