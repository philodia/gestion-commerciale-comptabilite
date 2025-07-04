// client/src/services/api.js

import axios from 'axios';
import { store } from '../store'; // Import direct du store pour accéder au state
import { logout } from '../store/slices/authSlice'; // Import de l'action de déconnexion

/**
 * Création d'une instance Axios pré-configurée.
 * C'est le point d'entrée unique pour toutes les communications avec l'API backend.
 */
const api = axios.create({
  // La baseURL est le préfixe que nous avons configuré dans le proxy de Vite.
  // Toutes les requêtes faites avec cette instance (ex: api.get('/users'))
  // seront en réalité envoyées à 'http://localhost:5001/api/users' par le proxy.
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTEUR DE REQUÊTE (Request Interceptor)
 * 
 * Cette fonction est exécutée AVANT que chaque requête ne soit envoyée.
 * Son rôle est d'attacher le token JWT à l'en-tête 'Authorization'.
 */
api.interceptors.request.use(
  (config) => {
    // On récupère le token depuis le state Redux.
    const token = store.getState().auth.token;

    // Si un token existe, on l'ajoute à l'en-tête de la requête.
    if (token) {
      // Le format 'Bearer <token>' est un standard.
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Il est crucial de retourner la configuration, sinon la requête est bloquée.
    return config;
  },
  (error) => {
    // En cas d'erreur lors de la configuration de la requête, on la rejette.
    return Promise.reject(error);
  }
);


/**
 * INTERCEPTEUR DE RÉPONSE (Response Interceptor)
 * 
 * Cette fonction est exécutée APRÈS la réception de chaque réponse de l'API.
 * Son rôle est de gérer les erreurs globales, notamment l'expiration du token.
 */
api.interceptors.response.use(
  // Si la réponse est réussie (status 2xx), on la retourne simplement.
  (response) => {
    return response;
  },
  // Si la réponse est en erreur...
  (error) => {
    // On vérifie si l'erreur est une erreur 401 (Unauthorized).
    // Cela signifie généralement que le token est invalide ou a expiré.
    if (error.response && error.response.status === 401) {
      // On déclenche l'action de déconnexion de Redux.
      // Cela va nettoyer le state, supprimer le token du localStorage,
      // et faire en sorte que les composants réagissent à la déconnexion.
      store.dispatch(logout());
      
      // Optionnel : on peut forcer une redirection vers la page de login.
      // window.location.href = '/login';
    }

    // On retourne l'erreur pour qu'elle puisse être gérée localement
    // dans le composant qui a initié l'appel (ex: afficher un message d'erreur).
    return Promise.reject(error);
  }
);

export default api;