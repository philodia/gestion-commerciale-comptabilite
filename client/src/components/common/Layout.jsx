// client/src/components/common/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import '../../App.css'; // On réutilise le CSS principal

const MainLayout = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h1 className="sidebar-brand">GestionPro</h1>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-link">Tableau de Bord</Link>
          <Link to="/ventes" className="nav-link">Ventes</Link>
          <Link to="/clients" className="nav-link">Clients</Link>
          <Link to="/produits" className="nav-link">Produits</Link>
          <Link to="/comptabilite" className="nav-link">Comptabilité</Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-danger mt-auto">
          Déconnexion
        </button>
      </aside>
      <div className="main-panel">
        <header className="app-header">
          <div>Barre de recherche...</div>
          <div>Profil Utilisateur</div>
        </header>
        <main className="content-wrapper">
          <Outlet /> {/* Le contenu de la page enfant s'affiche ici */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;