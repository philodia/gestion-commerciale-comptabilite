// client/src/pages/auth/Login.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Nos hooks et composants UI personnalisés
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  // State local pour les champs du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  // Hooks pour la navigation et l'authentification
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error } = useAuth();

  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirige vers le tableau de bord
    }
  }, [isAuthenticated, navigate]);

  // Gère les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return; // Validation simple

    try {
      // Le hook useAuth retourne une promesse que l'on peut attendre
      await login({ email, password }).unwrap();
      // Si le login réussit, la redirection se fera via le useEffect
      // ou on pourrait la forcer ici : navigate('/');
    } catch (rejectedValueOrSerializedError) {
      // L'erreur est déjà dans le state `error` de Redux,
      // donc pas besoin de la gérer ici, sauf pour des cas spécifiques.
      console.error('Échec de la connexion:', rejectedValueOrSerializedError);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <Card
          title={
            <div className="text-center">
              <h2 className="h3">Bienvenue sur GestionPro</h2>
              <p className="text-muted">Connectez-vous à votre compte</p>
            </div>
          }
        >
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Input
              id="email"
              name="email"
              type="email"
              label="Adresse Email"
              placeholder="votre.email@example.com"
              value={email}
              onChange={handleChange}
              icon={<FaEnvelope />}
              required
              disabled={isLoading}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              value={password}
              onChange={handleChange}
              icon={<FaLock />}
              required
              disabled={isLoading}
            />

            <div className="d-flex justify-content-end mb-3">
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted">
              Vous n'avez pas de compte ?{' '}
              <Link to="/register">Inscrivez-vous</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;