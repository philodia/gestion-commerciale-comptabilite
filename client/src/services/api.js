// client/src/services/api.js

import axios from 'axios';
// NE PAS IMPORTER LE STORE ICI.
// import { store } from '../store'; // <-- C'est cette ligne qui cause la dépendance circulaire.

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercepteur de requête Axios.
 * 
 * Cette version corrigée importe le store À L'INTÉRIEUR de la fonction de l'intercepteur.
 * Cela retarde l'importation jusqu'au moment où une requête est effectivement faite,
 * ce qui casse la dépendance circulaire au moment du chargement initial des modules.
 */
api.interceptors.request.use(
  async (config) => {
    // On importe le store ici, juste au moment où on en a besoin.
    // L'utilisation de 'await import()' est pour le chargement dynamique, mais pour la simplicité,
    // un require() ou un import() statique placé ici fonctionne car il est appelé plus tard.
    const { store } = await import('../store');
    
    const token = store.getState().auth.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// L'intercepteur de réponse peut rester tel quel, car il n'importe pas le store.
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Erreur 401: Non autorisé. Le token est peut-être expiré.");
      // Déconnexion de l'utilisateur en cas d'erreur 401
      const { store } = await import('../store');
      const { logout } = await import('../store/slices/authSlice');
      store.dispatch(logout());
    }
    
    return Promise.reject(error);
  }
);

export default api;