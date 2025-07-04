// client/src/components/common/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaCog,
  FaChartBar,
} from 'react-icons/fa';
import './Sidebar.css';

// Les éléments de navigation sont définis dans un tableau pour une maintenance facile.
const navItems = [
  { to: '/', icon: <FaTachometerAlt />, text: 'Tableau de Bord' },
  { to: '/ventes', icon: <FaShoppingCart />, text: 'Ventes' },
  { to: '/clients', icon: <FaUsers />, text: 'Clients' },
  { to: '/produits', icon: <FaBoxOpen />, text: 'Produits & Stocks' },
  { to: '/comptabilite', icon: <FaFileInvoiceDollar />, text: 'Comptabilité' },
  { to: '/rapports', icon: <FaChartBar />, text: 'Rapports' },
  { to: '/parametres', icon: <FaCog />, text: 'Paramètres' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        {/* Vous pourrez remplacer le texte par un logo plus tard */}
        <h2>GestionPro</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            // `end` est important pour la route racine '/' afin qu'elle ne soit
            // pas active pour toutes les autres routes (ex: '/clients').
            end={item.to === '/'}
            // `className` peut être une fonction qui reçoit l'état d'activité du lien.
            // C'est la méthode recommandée pour styler les liens actifs.
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.text}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;