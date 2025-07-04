// client/src/store/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth'; // On importe notre service d'authentification

// ===================================================================
// ASYNC THUNKS - GESTION DES OPÉRATIONS ASYNCHRONES
// ===================================================================

/**
 * Thunk pour l'enregistrement d'un utilisateur.
 * Gère l'appel API via le service et retourne les données en cas de succès,
 * ou rejette avec une valeur d'erreur en cas d'échec.
 */
export const register = createAsyncThunk(
  'auth/register', // Nom de l'action pour le Redux DevTools
  async (userData, thunkAPI) => {
    try {
      // Appelle la méthode 'register' de notre service.
      return await authService.register(userData);
    } catch (error) {
      // Extrait un message d'erreur clair de la réponse de l'API.
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      // Rejette la promesse avec le message d'erreur.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Thunk pour la connexion d'un utilisateur.
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Thunk pour récupérer les informations de l'utilisateur si un token est présent.
 */
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, thunkAPI) => {
    try {
      return await authService.getCurrentUser();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// ===================================================================
// DÉFINITION DU SLICE
// ===================================================================

// Récupère le token depuis le localStorage pour l'état initial.
const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token: token,
  isAuthenticated: !!token, // Vrai si un token existe
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Reducers pour les actions synchrones
  reducers: {
    // Action pour réinitialiser l'état (par ex. pour effacer les erreurs)
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    // Action de déconnexion
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  // Reducers pour les actions asynchrones (gérées par les thunks)
  extraReducers: (builder) => {
    builder
      // Cas pour l'action register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Le message d'erreur vient du rejectWithValue
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Cas pour l'action login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Cas pour l'action getMe
      .addCase(getMe.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(getMe.rejected, (state) => {
        // Si getMe échoue, c'est que le token est invalide, on déconnecte.
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

// Exporte les actions synchrones pour être utilisées dans les composants si besoin
export const { reset, logout } = authSlice.actions;

// Exporte le reducer du slice pour l'ajouter au store
export default authSlice.reducer;