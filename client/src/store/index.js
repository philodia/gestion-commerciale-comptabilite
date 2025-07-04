// client/src/store/index.js

import { configureStore } from '@reduxjs/toolkit';

// --- Importation des Reducers (Slices) ---
// On importe le reducer exporté par défaut depuis notre fichier de slice.
import authReducer from './slices/authSlice';

// On pourrait avoir d'autres reducers ici à l'avenir :
// import clientReducer from './slices/clientSlice';
// import productReducer from './slices/productSlice';


/**
 * Création et configuration du store Redux.
 * Le store est la source unique de vérité pour l'état de l'application.
 */
export const store = configureStore({
  // L'objet 'reducer' est une carte qui associe un nom de "slice" à son reducer.
  // Le nom que nous donnons ici ('auth') sera la clé sous laquelle l'état de ce slice
  // sera stocké dans l'état global de Redux.
  reducer: {
    // La clé 'auth' correspond à l'état géré par authReducer.
    // Dans nos composants, nous accéderons à cet état via `state.auth`.
    auth: authReducer,

    // Quand nous ajouterons d'autres slices, nous les mettrons ici :
    // clients: clientReducer,
    // produits: productReducer,
  },

  // L'option 'devTools' est activée par défaut en développement, 
  // ce qui permet d'utiliser l'extension Redux DevTools dans le navigateur.
  // Pas besoin de la spécifier manuellement sauf pour la désactiver en production.
});