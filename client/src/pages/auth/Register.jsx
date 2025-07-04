// client/src/pages/auth/Register.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Nos hooks et composants UI personnalisés
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
  // State local pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { nom, email, password, passwordConfirm } = formData;

  const [errorLocal, setErrorLocal] = useState('');

  // Hooks pour la navigation et l'authentification
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error: authError } = useAuth();

  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
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
    setErrorLocal('');

    // Validation côté client
    if (password !== passwordConfirm) {
      setErrorLocal('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setErrorLocal('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    try {
      await register({ nom, email, password }).unwrap();
      // Si l'inscription réussit, la redirection se fera via le useEffect
    } catch (rejectedValueOrSerializedError) {
      // L'erreur de l'API est déjà gérée par le state `authError` de Redux
      console.error('Échec de l\'inscription:', rejectedValueOrSerializedError);
    }
  };

  const displayError = errorLocal || authError;

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div style={{ width: '100%', maxWidth: '480px', margin: '2rem 0' }}>
        <Card
          title={
            <div className="text-center">
              <h2 className="h3">Créer un compte</h2>
              <p className="text-muted">Rejoignez la plateforme GestionPro</p>
            </div>
          }
        >
          <form onSubmit={handleSubmit}>
            {displayError && (
              <Alert variant="danger" className="mb-3">
                {displayError}
              </Alert>
            )}

            <Input
              id="nom"
              name="nom"
              type="text"
              label="Nom complet"
              placeholder="Ex: Aïssatou Diallo"
              value={nom}
              onChange={handleChange}
              icon={<FaUser />}
              required
              disabled={isLoading}
            />

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
              placeholder="Minimum 6 caractères"
              value={password}
              onChange={handleChange}
              icon={<FaLock />}
              required
              disabled={isLoading}
            />
            
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="Confirmer le mot de passe"
              placeholder="Retapez votre mot de passe"
              value={passwordConfirm}
              onChange={handleChange}
              icon={<FaLock />}
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-100 mt-3"
              isLoading={isLoading}
            >
              S'inscrire
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted">
              Vous avez déjà un compte ?{' '}
              <Link to="/login">Connectez-vous</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;