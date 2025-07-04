// client/src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Utilisation de la variable d'environnement de Vite
  devTools: import.meta.env.MODE !== 'production',
});