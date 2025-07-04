// server/middleware/auth.js

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const authConfig = require('../config/auth'); // NOUVEAU : Import de la configuration

/**
 * Middleware pour protéger les routes.
 * Il vérifie si un token JWT valide est présent dans l'en-tête de la requête.
 * Si c'est le cas, il attache l'utilisateur correspondant à l'objet 'req'.
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1) Récupérer le token depuis l'en-tête 'Authorization' ou les cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ 
        status: 'fail', 
        message: 'Accès non autorisé. Veuillez vous connecter.' 
      });
    }

    // 2) Vérifier la validité du token
    // MODIFIÉ : Utilise le secret depuis authConfig au lieu de process.env directement
    const decodedPayload = await promisify(jwt.verify)(token, authConfig.jwt.secret);

    // 3) Vérifier si l'utilisateur associé au token existe toujours
    const currentUser = await User.findById(decodedPayload.id);
    if (!currentUser) {
      return res.status(401).json({ 
        status: 'fail', 
        message: 'L\'utilisateur associé à ce token n\'existe plus.' 
      });
    }

    // 4) Vérifier si l'utilisateur n'est pas désactivé
    if (!currentUser.actif) {
      return res.status(403).json({
        status: 'fail',
        message: 'Votre compte a été désactivé.'
      });
    }

    // Le token est valide, on attache l'utilisateur à la requête
    req.user = currentUser;
    next();

  } catch (error) {
    return res.status(401).json({ 
      status: 'fail', 
      message: 'Token invalide ou expiré. Veuillez vous reconnecter.' 
    });
  }
};

/**
 * Middleware de restriction de rôle.
 * (Ce middleware n'a pas besoin de modification car il ne dépend pas de la configuration)
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'Vous n\'avez pas les permissions nécessaires pour effectuer cette action.'
      });
    }
    next();
  };
};