// client/src/components/common/Header.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

// Import de nos composants et hooks personnalisés
import { useAuth } from '../../hooks/useAuth';
import Dropdown from '../ui/Dropdown';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // La redirection se fera automatiquement via les routes protégées,
    // mais on peut aussi forcer la navigation pour une meilleure réactivité.
    navigate('/login');
  };

  // Les éléments du menu déroulant de l'utilisateur
  const userDropdownItems = [
    {
      label: 'Mon Profil',
      onClick: () => navigate('/parametres/profil'),
      icon: <FaUserCircle />,
    },
    {
      label: 'Paramètres',
      onClick: () => navigate('/parametres'),
      icon: <FaCog />,
    },
    { isDivider: true },
    {
      label: 'Déconnexion',
      onClick: handleLogout,
      icon: <FaSignOutAlt />,
      isDanger: true,
    },
  ];

  return (
    <header className="app-header">
      {/* Côté gauche : recherche ou titre de la page */}
      <div className="header-left">
        {/* Placeholder pour une future barre de recherche */}
        <div className="search-bar">
          {/* <FaSearch /> <input type="text" placeholder="Rechercher..." /> */}
        </div>
      </div>

      {/* Côté droit : notifications et menu utilisateur */}
      <div className="header-right">
        <button className="icon-button">
          <FaBell />
          {/* Un badge de notification pourrait être ajouté ici */}
        </button>

        <div className="user-menu">
          {user && (
            <Dropdown
              align="end"
              trigger={
                <>
                  <img
                    // Placeholder pour l'avatar de l'utilisateur
                    src={`https://ui-avatars.com/api/?name=${user.nom}&background=3b82f6&color=fff&rounded=true`}
                    alt={`Avatar de ${user.nom}`}
                    className="user-avatar"
                  />
                  <span className="user-name d-none d-md-inline">{user.nom}</span>
                </>
              }
              items={userDropdownItems}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;