import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, resetError } from '../../store/slices/authSlice';

// Spinner component
const Spinner = () => (
  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
);

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    return () => {
      dispatch(resetError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow-lg border-0" style={{ width: '450px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold text-primary">GestionPro</h1>
            <p className="text-muted">Connectez-vous à votre espace</p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="nom@example.com"
                value={email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Adresse Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Mot de passe</label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Se souvenir de moi</label>
              </div>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>Mot de passe oublié ?</Link>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                {isLoading && <Spinner />}
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-muted">
              Vous n'avez pas de compte ? <Link to="/register" style={{ textDecoration: 'none' }}>Inscrivez-vous</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
