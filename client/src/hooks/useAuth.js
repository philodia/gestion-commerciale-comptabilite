// client/src/hooks/useAuth.js

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

// On importe les actions (async thunks) et le reducer de déconnexion depuis notre slice
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
} from '../store/slices/authSlice';
import authService from '../services/auth';

/**
 * Hook personnalisé pour accéder et gérer l'état d'authentification.
 * Il fournit une API simple et centralisée pour les composants de l'UI,
 * en masquant les détails d'implémentation de Redux.
 *
 * @returns {object} Un objet contenant :
 *  - isAuthenticated (boolean): L'utilisateur est-il connecté ?
 *  - user (object|null): Les informations de l'utilisateur connecté.
 *  - isLoading (boolean): Un état de chargement est-il en cours (login/register) ?
 *  - error (string|null): Le dernier message d'erreur d'authentification.
 *  - login (function): Fonction pour connecter un utilisateur.
 *  - register (function): Fonction pour enregistrer un nouvel utilisateur.
 *  - logout (function): Fonction pour déconnecter l'utilisateur.
 */
export const useAuth = () => {
  const dispatch = useDispatch();

  // On utilise useSelector pour extraire les données du slice 'auth' du store Redux.
  const { user, isAuthenticated, isLoading, error, token } = useSelector(
    (state) => state.auth
  );

  // On utilise useCallback pour mémoriser les fonctions de rappel.
  // Cela évite de les recréer à chaque rendu et optimise les performances,
  // surtout si elles sont passées en props à des composants enfants mémorisés.

  /**
   * Déclenche le processus de connexion.
   * @param {object} credentials - { email, password }
   */
  const login = useCallback(
    (credentials) => {
      // On "dispatch" l'action thunk importée depuis le slice.
      // Le thunk se chargera de l'appel API via le service.
      return dispatch(loginAction(credentials));
    },
    [dispatch]
  );

  /**
   * Déclenche le processus d'inscription.
   * @param {object} userData - { nom, email, password, role }
   */
  const register = useCallback(
    (userData) => {
      return dispatch(registerAction(userData));
    },
    [dispatch]
  );

  /**
   * Déclenche le processus de déconnexion.
   */
  const logout = useCallback(() => {
    // Le service s'occupe de nettoyer le localStorage.
    authService.logout();
    // Le dispatch s'occupe de nettoyer le state Redux.
    dispatch(logoutAction());
  }, [dispatch]);

  // On retourne un objet simple et clair que les composants peuvent utiliser.
  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    token, // Peut être utile pour le débogage ou des cas avancés

    // Fonctions d'action
    login,
    register,
    logout,
  };
};

/*
// ===================================================================
// EXEMPLE D'UTILISATION DANS UN COMPOSANT
// ===================================================================

import { useAuth } from '../hooks/useAuth';

const UserProfileMenu = () => {
  // Une seule ligne pour obtenir tout ce dont on a besoin !
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return <a href="/login">Se connecter</a>;
  }

  return (
    <div>
      <span>Bonjour, {user.nom} !</span>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};

// Autre exemple dans un formulaire de connexion

import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  // ... state local pour les champs du formulaire ...

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      // ... champs du formulaire ...
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  )
}

*/