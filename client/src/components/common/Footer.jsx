// client/src/components/common/Footer.jsx

import React from 'react';
import './Footer.css'; // Nous allons créer ce fichier pour le style

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span className="copyright">
          © {currentYear} GestionPro. Tous droits réservés.
        </span>
        <span className="version">
          Version 1.0.0
        </span>
      </div>
    </footer>
  );
};

export default Footer;