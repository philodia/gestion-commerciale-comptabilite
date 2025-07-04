// client/src/components/ui/Button.jsx

import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Un composant Bouton personnalisé et réutilisable.
 * Il gère les états de chargement, les icônes, et standardise les styles.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Le contenu du bouton (généralement du texte).
 * @param {function} [props.onClick] - La fonction à exécuter lors du clic.
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Le type HTML du bouton.
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'|'link'} [props.variant='primary'] - La variante de couleur Bootstrap.
 * @param {'sm'|'lg'} [props.size] - La taille du bouton.
 * @param {boolean} [props.isLoading=false] - Si true, affiche un spinner et désactive le bouton.
 * @param {boolean} [props.disabled=false] - Pour désactiver manuellement le bouton.
 * @param {React.ReactNode} [props.icon] - Une icône à afficher avant le texte.
 * @param {string} [props.className=''] - Classes CSS supplémentaires.
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size,
  isLoading = false,
  disabled = false,
  icon,
  className = '',
  ...rest // Pour passer d'autres props natives du bouton
}) => {
  const isDisabled = isLoading || disabled;

  return (
    <BootstrapButton
      type={type}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={isDisabled}
      className={`d-inline-flex align-items-center justify-content-center ${className}`}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {icon && <span className="me-2">{icon}</span>}
          {children}
        </>
      )}
    </BootstrapButton>
  );
};

// Définition des PropTypes pour la documentation et la validation.
Button.propTypes = {
  /** Le contenu textuel ou JSX du bouton. */
  children: PropTypes.node.isRequired,
  /** La fonction à appeler au clic. */
  onClick: PropTypes.func,
  /** Le type HTML natif du bouton. */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Le style de couleur du bouton. */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  /** La taille du bouton. */
  size: PropTypes.oneOf(['sm', 'lg']),
  /** Affiche un spinner et désactive le bouton. */
  isLoading: PropTypes.bool,
  /** Désactive manuellement le bouton. */
  disabled: PropTypes.bool,
  /** Une icône (composant React) à afficher à gauche du texte. */
  icon: PropTypes.node,
  /** Classes CSS additionnelles. */
  className: PropTypes.string,
};

// Valeurs par défaut.
Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  isLoading: false,
  disabled: false,
};

export default Button;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import { useState } from 'react';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const MyPageComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Formulaire soumis !');
    }, 2000); // Simule un appel API
  };

  return (
    <div className="p-4 d-flex align-items-center flex-wrap gap-3">
      {/* Bouton standard */
      {/*<Button variant="primary" icon={<FaPlus />}>
        Ajouter un client
      </Button>

      {/* Bouton de soumission avec état de chargement */}
      {/*<Button 
        type="submit" 
        variant="success"
        icon={<FaSave />}
        isLoading={isSubmitting}
        onClick={handleSubmit}
      >
        Sauvegarder
      </Button>

      {/* Bouton de danger */}
      {/*<Button variant="danger" icon={<FaTrash />} size="sm">
        Supprimer
      </Button>

      {/* Bouton désactivé */}
      {/*<Button variant="secondary" disabled>
        Action désactivée
      </Button>
    </div>
  );
};*/}