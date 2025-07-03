// client/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';

// Nous ajouterons les "reducers" ici au fur et à mesure
// Pour l'instant, on crée un store vide mais fonctionnel.
export const store = configureStore({
  reducer: {}, // L'objet des reducers est vide pour le moment
});