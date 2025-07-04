// client/src/components/common/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';

// Import de nos composants de layout
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

// Import du fichier CSS pour le layout global
import './Layout.css';

/**
 * Le composant Layout principal pour les pages protégées de l'application.
 * Il assemble la Sidebar, le Header, et le Footer autour du contenu de la page
 * qui est rendu via le composant <Outlet /> de React Router.
 */
const Layout = () => {
  return (
    <div className="app-layout">
      {/* Colonne de navigation principale sur la gauche */}
      <Sidebar />

      {/* Panneau principal qui contient le header, le contenu et le footer */}
      <div className="main-panel">
        <Header />

        {/* Le wrapper pour le contenu principal de la page */}
        <main className="content-wrapper">
          {/* Outlet est le placeholder où React Router injectera
              le composant de la page actuelle (ex: Dashboard, ClientsList, etc.) */}
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;