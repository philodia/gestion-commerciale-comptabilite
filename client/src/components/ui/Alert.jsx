// client/src/components/ui/Alert.jsx

import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle, 
  FaInfoCircle 
} from 'react-icons/fa';

// Objet de mapping pour associer une variante de couleur à une icône
const ICONS_MAP = {
  success: <FaCheckCircle size={20} />,
  danger: <FaTimesCircle size={20} />,
  warning: <FaExclamationTriangle size={20} />,
  info: <FaInfoCircle size={20} />,
};

/**
 * Un composant d'alerte réutilisable avec icônes et gestion de la fermeture.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {'success'|'danger'|'warning'|'info'} props.variant - Le type d'alerte, qui détermine la couleur et l'icône.
 * @param {string} [props.title] - Le titre optionnel de l'alerte.
 * @param {React.ReactNode} props.children - Le contenu principal (message) de l'alerte.
 * @param {boolean} [props.dismissible=false] - Si l'alerte peut être fermée par l'utilisateur.
 * @param {function} [props.onClose] - La fonction à appeler lorsque l'alerte est fermée.
 * @param {string} [props.className=''] - Classes CSS supplémentaires.
 */
const Alert = ({ 
  variant, 
  title, 
  children, 
  dismissible = false, 
  onClose, 
  className = '' 
}) => {
  // Si il n'y a pas de message à afficher, on ne rend rien.
  if (!children) {
    return null;
  }

  const icon = ICONS_MAP[variant];

  return (
    <BootstrapAlert
      variant={variant}
      onClose={onClose}
      dismissible={dismissible}
      className={`d-flex align-items-center ${className}`} // Utilise flexbox pour bien aligner icône et texte
    >
      {icon && <div className="flex-shrink-0 me-3">{icon}</div>}
      <div className="flex-grow-1">
        {title && <BootstrapAlert.Heading as="h5" className="mb-1">{title}</BootstrapAlert.Heading>}
        {children}
      </div>
    </BootstrapAlert>
  );
};

// Définition des PropTypes pour la documentation et la validation.
Alert.propTypes = {
  /** Le type/style de l'alerte. Détermine la couleur et l'icône. */
  variant: PropTypes.oneOf(['success', 'danger', 'warning', 'info']).isRequired,
  /** Le titre optionnel en gras de l'alerte. */
  title: PropTypes.string,
  /** Le contenu du message de l'alerte. */
  children: PropTypes.node.isRequired,
  /** Définit si l'alerte peut être fermée. */
  dismissible: PropTypes.bool,
  /** Fonction appelée lors de la fermeture. Requis si 'dismissible' est true. */
  onClose: PropTypes.func,
  /** Classes CSS additionnelles. */
  className: PropTypes.string,
};

// Valeurs par défaut.
Alert.defaultProps = {
  title: '',
  dismissible: false,
  onClose: () => {},
  className: '',
};

export default Alert;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import { useState } from 'react';

const MyPageComponent = () => {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="p-4 d-flex flex-column gap-3">
      <Alert variant="success">
        L'opération a été effectuée avec succès !
      </Alert>

      <Alert variant="danger" title="Erreur de Connexion">
        L'email ou le mot de passe que vous avez entré est incorrect.
      </Alert>
      
      {showWarning && (
        <Alert 
          variant="warning" 
          title="Attention"
          dismissible
          onClose={() => setShowWarning(false)}
        >
          Votre session expirera dans 5 minutes.
        </Alert>
      )}

      <Alert variant="info">
        <b>Nouveau :</b> Vous pouvez maintenant exporter vos factures au format PDF.
      </Alert>
    </div>
  );
};

*/