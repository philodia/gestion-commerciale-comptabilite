// client/src/services/auth.js

import api from './api'; // On importe notre instance Axios pré-configurée

/**
 * Service d'authentification.
 * Regroupe toutes les fonctions d'appel à l'API liées à l'authentification.
 */

/**
 * Enregistre un nouvel utilisateur.
 * @param {object} userData - Les données de l'utilisateur ({ nom, email, password, role }).
 * @returns {Promise<object>} Les données de la réponse (token et utilisateur).
 */
const register = async (userData) => {
  // Fait l'appel POST à '/api/auth/register'
  const response = await api.post('/auth/register', userData);

  // Si la réponse contient un token, on le stocke dans le localStorage.
  // C'est un effet de bord important pour maintenir la session.
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

/**
 * Connecte un utilisateur existant.
 * @param {object} credentials - Les identifiants de l'utilisateur ({ email, password }).
 * @returns {Promise<object>} Les données de la réponse (token et utilisateur).
 */
const login = async (credentials) => {
  // Fait l'appel POST à '/api/auth/login'
  const response = await api.post('/auth/login', credentials);

  // Comme pour register, on stocke le token pour la persistance de la session.
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

/**
 * Déconnecte l'utilisateur.
 * C'est une opération purement côté client pour une authentification JWT stateless.
 */
const logout = () => {
  // On supprime simplement le token du localStorage.
  localStorage.removeItem('token');
  // L'intercepteur de réponse dans api.js et la logique de route protégée
  // se chargeront du reste.
};

/**
 * Récupère les données de l'utilisateur actuellement authentifié.
 * Utile pour vérifier la validité du token au chargement de l'application.
 * @returns {Promise<object>} Les données de l'utilisateur.
 */
const getCurrentUser = async () => {
  // Fait l'appel GET à '/api/auth/me'.
  // Le token est automatiquement ajouté par l'intercepteur de api.js
  const response = await api.get('/auth/me');
  return response.data;
};


// On exporte un objet contenant toutes nos fonctions de service.
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;