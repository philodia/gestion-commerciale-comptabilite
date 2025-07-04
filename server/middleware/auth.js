// server/middleware/auth.js

const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // Utilitaire Node.js pour transformer une fonction callback en promesse
const User = require('../models/User');

/**
 * Middleware pour protéger les routes.
 * Il vérifie si un token JWT valide est présent dans l'en-tête de la requête.
 * Si c'est le cas, il attache l'utilisateur correspondant à l'objet 'req'.
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1) Récupérer le token depuis l'en-tête 'Authorization'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Le format est "Bearer <token>", on extrait juste le token
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      // Alternative : récupérer le token depuis le cookie (si utilisé)
      token = req.cookies.jwt;
    }

    if (!token) {
      // Si aucun token n'est trouvé, l'utilisateur n'est pas autorisé
      return res.status(401).json({ 
        status: 'fail', 
        message: 'Accès non autorisé. Veuillez vous connecter.' 
      });
    }

    // 2) Vérifier la validité du token
    // jwt.verify est asynchrone, on le "promisifie" pour utiliser async/await
    const decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Vérifier si l'utilisateur associé au token existe toujours
    // decodedPayload contient l'id de l'utilisateur que nous avons mis lors de la signature
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

    // Le token est valide et l'utilisateur existe.
    // On attache l'objet utilisateur (sans le mot de passe) à la requête
    // pour qu'il soit accessible dans les prochains middlewares ou contrôleurs.
    req.user = currentUser;
    next(); // Passe au middleware ou au contrôleur suivant

  } catch (error) {
    // Gère les erreurs de jwt.verify (token invalide, expiré, etc.)
    return res.status(401).json({ 
      status: 'fail', 
      message: 'Token invalide ou expiré. Veuillez vous reconnecter.' 
    });
  }
};

/**
 * Middleware de restriction de rôle.
 * Doit être utilisé APRÈS le middleware 'protect'.
 * @param {...string} roles - Une liste de rôles autorisés (ex: 'Admin', 'Comptable').
 */
exports.authorize = (...roles) => {
  // Ce middleware retourne une autre fonction middleware, c'est une "closure".
  // Cela permet de passer des arguments (les rôles) au middleware.
  return (req, res, next) => {
    // Le middleware 'protect' a déjà été exécuté, donc req.user doit exister.
    if (!req.user || !roles.includes(req.user.role)) {
      // Si le rôle de l'utilisateur n'est pas dans la liste des rôles autorisés...
      return res.status(403).json({ // 403 = Forbidden
        status: 'fail',
        message: 'Vous n\'avez pas les permissions nécessaires pour effectuer cette action.'
      });
    }

    // L'utilisateur a le bon rôle, on peut continuer.
    next();
  };
};