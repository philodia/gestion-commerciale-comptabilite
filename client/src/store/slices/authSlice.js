// client/src/store/slices/authSlice.js

import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import api from '../../services/api';

// ===================================================================
// ASYNC THUNKS
// ===================================================================

/**
 * NOUVEAU: Thunk pour charger les données de l'utilisateur si un token existe.
 * C'est la pièce maîtresse pour maintenir la session utilisateur active après un refresh.
 */
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, thunkAPI) => {
    // Si aucun token n'est dans l'état, inutile d'essayer
    if (!thunkAPI.getState().auth.token) {
      return thunkAPI.rejectWithValue('Aucun token trouvé');
    }
    try {
      const response = await api.get('/auth/me');
      return response.data; // Le payload sera { status: 'success', data: { user: {...} } }
    } catch (error) {
      const message = (error.response?.data?.message) || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      const message = (error.response?.data?.message) || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      const message = (error.response?.data?.message) || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ===================================================================
// DÉFINITION DU SLICE
// ===================================================================

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token: token,
  isAuthenticated: false, // Initialisé à false, `loadUser` confirmera l'état
  isLoading: true, // Commence à true car on va tenter de charger l'utilisateur
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // AMÉLIORÉ: La déconnexion est une action synchrone, plus besoin d'un thunk.
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Cas pour le chargement initial de l'utilisateur
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        // Si loadUser échoue, le token est invalide. On nettoie tout.
        localStorage.removeItem('token');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload; // On peut garder l'erreur si besoin de l'afficher
      })
      
      // AMÉLIORÉ: Utilisation de `addMatcher` pour éviter la répétition de code.
      // Gère l'état 'pending' pour login ET register
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Gère l'état 'fulfilled' pour login ET register
      .addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
      })
      // Gère l'état 'rejected' pour login ET register
      .addMatcher(isAnyOf(register.rejected, login.rejected), (state, action) => {
        localStorage.removeItem('token'); // Sécurité : on nettoie un éventuel token invalide
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;