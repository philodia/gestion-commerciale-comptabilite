// client/src/components/ui/Tooltip.jsx

import React from 'react';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Un composant "wrapper" pour afficher une infobulle (Tooltip) au survol d'un élément enfant.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - L'élément React qui déclenchera l'infobulle au survol.
 * @param {string|React.ReactNode} props.text - Le contenu de l'infobulle. Peut être du texte ou du JSX.
 * @param {'top'|'right'|'bottom'|'left'} [props.placement='top'] - La position de l'infobulle par rapport à l'élément.
 * @param {string} [props.className=''] - Des classes CSS supplémentaires à appliquer à l'élément déclencheur.
 * @param {number} [props.delay=400] - Le délai en millisecondes avant que l'infobulle n'apparaisse.
 */
const Tooltip = ({ children, text, placement = 'top', className = '', delay = 400 }) => {
  // Si le texte de l'infobulle est vide, on ne l'affiche pas et on retourne simplement l'enfant.
  // Cela évite d'avoir une infobulle vide qui s'affiche.
  if (!text) {
    return <span className={className}>{children}</span>;
  }

  // Fonction qui rend l'infobulle.
  // Elle est passée à OverlayTrigger qui l'appellera avec les props nécessaires.
  const renderTooltip = (props) => (
    <BootstrapTooltip id={`tooltip-${Math.random()}`} {...props}>
      {text}
    </BootstrapTooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: delay, hide: 250 }}
      overlay={renderTooltip}
    >
      {/* 
        OverlayTrigger a besoin que son enfant direct puisse accepter une 'ref'.
        Les composants de classe et les composants fonctionnels wrappés dans React.forwardRef le peuvent.
        Pour un simple <span> ou <div>, React gère cela automatiquement.
      */}
      <span className={className} style={{ display: 'inline-block', cursor: 'pointer' }}>
        {children}
      </span>
    </OverlayTrigger>
  );
};

// Définition des PropTypes pour la documentation et la validation.
Tooltip.propTypes = {
  /** L'élément à survoler pour afficher l'infobulle. Doit être un seul enfant React. */
  children: PropTypes.node.isRequired,
  /** Le texte ou le contenu JSX à afficher dans l'infobulle. */
  text: PropTypes.node.isRequired,
  /** La position de l'infobulle. */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Classes CSS additionnelles pour l'élément déclencheur. */
  className: PropTypes.string,
  /** Délai d'apparition en ms. */
  delay: PropTypes.number,
};

// Valeurs par défaut pour les props non obligatoires.
Tooltip.defaultProps = {
  placement: 'top',
  className: '',
  delay: 400,
};

export default Tooltip;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import { FaInfoCircle, FaSave, FaPlusCircle } from 'react-icons/fa';
import Button from './Button'; // En supposant que vous avez un composant Button

const MyPageComponent = () => {
  return (
    <div style={{ padding: '50px', display: 'flex', gap: '20px' }}>

      {/* Exemple 1: Infobulle sur une icône */
     {/* <Tooltip text="Ceci est une information importante !">
        <FaInfoCircle size={24} />
      </Tooltip>*/}

      {/* Exemple 2: Infobulle sur un bouton désactivé (très courant) */}
      {/*<Tooltip text="Remplissez tous les champs pour sauvegarder.">
        {/* On wrappe le bouton dans un span car un bouton désactivé ne déclenche pas les événements de survol */}
       {/* <span>
            <Button disabled>
                <FaSave /> Sauvegarder
            </Button>
        </span>
      </Tooltip>*/}

      {/* Exemple 3: Infobulle sur un texte simple */}
     {/* <Tooltip text="Cliquez pour ajouter un nouvel élément." placement="right">
        <FaPlusCircle size={24} color="green" />
      </Tooltip>
      
    </div>
  );
};*/}

