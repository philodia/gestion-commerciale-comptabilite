// client/src/components/ui/Tabs.jsx

import React from 'react';
import { Tabs as BootstrapTabs, Tab as BootstrapTab } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Un composant d'onglets (Tabs) réutilisable et piloté par les données.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {Array<object>} props.tabs - Un tableau d'objets décrivant chaque onglet.
 *   Chaque objet doit contenir : `eventKey`, `title`, `content`.
 * @param {string} props.defaultActiveKey - La `eventKey` de l'onglet actif par défaut.
 * @param {'tabs'|'pills'} [props.variant='tabs'] - Le style visuel des onglets.
 * @param {string} [props.className=''] - Classes CSS supplémentaires pour le conteneur.
 * @param {boolean} [props.fill=false] - Indique si les onglets doivent occuper toute la largeur disponible.
 */
const Tabs = ({ tabs, defaultActiveKey, variant = 'tabs', className = '', fill = false }) => {
  // S'il n'y a pas d'onglet à afficher, on ne rend rien.
  if (!tabs || tabs.length === 0) {
    return null;
  }

  // Si defaultActiveKey n'est pas fourni, on prend la eventKey du premier onglet.
  const activeKey = defaultActiveKey || tabs[0].eventKey;

  return (
    <BootstrapTabs
      defaultActiveKey={activeKey}
      variant={variant}
      className={`custom-tabs ${className}`}
      fill={fill}
      mountOnEnter // Monte le contenu de l'onglet uniquement lorsqu'il devient actif
      unmountOnExit // Démonte le contenu lorsque l'onglet n'est plus actif (bon pour les perfs)
    >
      {tabs.map((tab) => (
        <BootstrapTab
          key={tab.eventKey}
          eventKey={tab.eventKey}
          title={tab.title}
          disabled={tab.disabled}
        >
          {/* Le contenu de l'onglet est ici. Il sera affiché uniquement si l'onglet est actif. */}
          <div className="p-3">
            {tab.content}
          </div>
        </BootstrapTab>
      ))}
    </BootstrapTabs>
  );
};

// Définition des PropTypes pour la documentation et la validation
Tabs.propTypes = {
  /** Un tableau d'objets, chacun représentant un onglet */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      /** Un identifiant unique pour l'onglet */
      eventKey: PropTypes.string.isRequired,
      /** Le titre affiché sur le bouton de l'onglet */
      title: PropTypes.string.isRequired,
      /** Le contenu (JSX) à afficher lorsque l'onglet est actif */
      content: PropTypes.node.isRequired,
      /** Optionnel : pour désactiver un onglet */
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /** La clé de l'onglet qui doit être actif au chargement */
  defaultActiveKey: PropTypes.string,
  /** Le style visuel des onglets ('tabs' ou 'pills') */
  variant: PropTypes.oneOf(['tabs', 'pills']),
  /** Classes CSS additionnelles pour le conteneur */
  className: PropTypes.string,
  /** Les onglets doivent-ils occuper toute la largeur disponible ? */
  fill: PropTypes.bool,
};

// Valeurs par défaut pour les props non obligatoires
Tabs.defaultProps = {
  variant: 'tabs',
  className: '',
  fill: false,
};

export default Tabs;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

const ProfileInfo = () => <div className="card"><div className="card-body">Informations du profil...</div></div>;
const OrderHistory = () => <div className="card"><div className="card-body">Historique des commandes...</div></div>;
const UserSettings = () => <div className="card"><div className="card-body">Paramètres utilisateur...</div></div>;


const MyPageComponent = () => {
  const userTabs = [
    {
      eventKey: 'profile',
      title: 'Profil',
      content: <ProfileInfo />,
    },
    {
      eventKey: 'orders',
      title: 'Historique',
      content: <OrderHistory />,
    },
    {
      eventKey: 'settings',
      title: 'Paramètres',
      content: <UserSettings />,
      disabled: true, // Exemple d'onglet désactivé
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>Fiche Client</h3>
      <Tabs 
        tabs={userTabs} 
        defaultActiveKey="profile"
        variant="pills"
      />
    </div>
  );
};

*/