// server/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// --- FONCTIONS UTILITAIRES (déjà créées) ---
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
  res.cookie('jwt', token, cookieOptions);
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
// FONCTIONS DU CONTRÔLEUR (Vérifiez bien cette section)
// ===================================================================

// Assurez-vous que 'exports.' est présent devant chaque fonction
exports.register = async (req, res) => {
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

exports.login = async (req, res) => {
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

// On a aussi besoin du controller pour la route /me
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
// VÉRIFIEZ SURTOUT QUE CES DEUX EXPORTS SONT PRÉSENTS
// ===================================================================
exports.forgotPassword = async (req, res) => {
  res.status(501).json({ status: 'error', message: 'Cette fonctionnalité n\'est pas encore implémentée.' });
};

exports.resetPassword = async (req, res) => {
  res.status(501).json({ status: 'error', message: 'Cette fonctionnalité n\'est pas encore implémentée.' });
};