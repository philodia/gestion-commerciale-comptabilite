// client/src/components/ui/Dropdown.jsx

import React from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Un composant Dropdown réutilisable construit sur react-bootstrap.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.trigger - Le contenu du bouton qui ouvre le dropdown (texte, icône, etc.).
 * @param {Array<object>} props.items - Un tableau d'objets pour les éléments du menu.
 *   Chaque objet peut avoir : `label`, `onClick`, `icon`, `isDivider`, `isDanger`.
 * @param {'start'|'end'} [props.align='start'] - L'alignement du menu déroulant.
 * @param {string} [props.className=''] - Classes CSS supplémentaires pour le conteneur du dropdown.
 */
const Dropdown = ({ trigger, items, align = 'start', className = '' }) => {
  return (
    <BootstrapDropdown className={className}>
      <BootstrapDropdown.Toggle 
        variant="outline-secondary" // Style sobre, facilement personnalisable
        id={`dropdown-basic-${Math.random()}`}
        size="sm" // Taille par défaut petite, commune pour les actions
      >
        {trigger}
      </BootstrapDropdown.Toggle>

      <BootstrapDropdown.Menu align={align}>
        {items.map((item, index) => {
          // Gère les séparateurs
          if (item.isDivider) {
            return <BootstrapDropdown.Divider key={`divider-${index}`} />;
          }

          // Gère les éléments de menu cliquables
          return (
            <BootstrapDropdown.Item
              key={item.label || index}
              onClick={item.onClick}
              className={item.isDanger ? 'text-danger' : ''}
              disabled={item.disabled}
            >
              {item.icon && <span className="me-2">{item.icon}</span>}
              {item.label}
            </BootstrapDropdown.Item>
          );
        })}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
};

// Définition des PropTypes pour la validation et l'autocomplétion
Dropdown.propTypes = {
  /** Le contenu (texte ou composant) du bouton principal */
  trigger: PropTypes.node.isRequired,
  /** La liste des éléments à afficher dans le menu */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      isDivider: PropTypes.bool,
      isDanger: PropTypes.bool,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /** Alignement du menu par rapport au bouton */
  align: PropTypes.oneOf(['start', 'end']),
  /** Classes CSS additionnelles */
  className: PropTypes.string,
};

// Valeurs par défaut pour les props non obligatoires
Dropdown.defaultProps = {
  align: 'start',
  className: '',
};

export default Dropdown;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import { FaEdit, FaTrash, FaCog } from 'react-icons/fa';

const MyPageComponent = () => {
  const dropdownItems = [
    {
      label: 'Modifier',
      onClick: () => console.log('Modifier cliqué'),
      icon: <FaEdit />,
    },
    {
      label: 'Paramètres',
      onClick: () => console.log('Paramètres cliqué'),
      icon: <FaCog />,
      disabled: true, // Exemple d'un item désactivé
    },
    { isDivider: true }, // Un séparateur
    {
      label: 'Supprimer',
      onClick: () => console.log('Supprimer cliqué'),
      icon: <FaTrash />,
      isDanger: true, // Style en rouge
    },
  ];

  return (
    <div style={{ padding: '50px' }}>
      <Dropdown 
        trigger="Actions" 
        items={dropdownItems} 
        align="end" 
      />
      
      <Dropdown 
        trigger={<FaCog />} // Le trigger peut aussi être une icône
        items={dropdownItems} 
        align="end" 
      />
    </div>
  );
};

*/