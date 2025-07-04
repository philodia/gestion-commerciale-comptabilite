// client/src/components/ui/Badge.jsx

import React from 'react';
import { Badge as BootstrapBadge } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Objet de mapping pour traduire les statuts de notre application en variantes de couleur Bootstrap.
// C'est la partie "intelligente" de notre composant.
const STATUS_TO_VARIANT_MAP = {
  // Statuts de documents
  payee: 'success',
  payée: 'success',
  paid: 'success',
  envoyee: 'primary',
  envoyée: 'primary',
  sent: 'primary',
  brouillon: 'secondary',
  draft: 'secondary',
  partiel: 'warning',
  partial: 'warning',
  en_retard: 'danger',
  overdue: 'danger',
  annulee: 'dark',
  annulée: 'dark',
  canceled: 'dark',
  
  // Statuts de stock
  en_stock: 'success',
  stock_faible: 'warning',
  hors_stock: 'danger',
  
  // Rôles utilisateurs
  admin: 'danger',
  comptable: 'info',
  commercial: 'primary',
  vendeur: 'success',
};

/**
 * Un composant Badge réutilisable qui peut mapper automatiquement des statuts
 * à des couleurs, ou utiliser une variante de couleur directement.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Le texte à afficher dans le badge.
 * @param {string} [props.variant] - La variante de couleur Bootstrap (ex: 'primary', 'success').
 *   Si elle est fournie, elle a la priorité sur le mapping de statut.
 * @param {'sm'|'md'|'lg'} [props.size] - La taille du badge.
 * @param {string} [props.className=''] - Classes CSS supplémentaires.
 */
const Badge = ({ children, variant, size, className = '' }) => {
  // Détermine la variante de couleur.
  // 1. On utilise la 'variant' fournie en priorité.
  // 2. Sinon, on essaie de mapper le contenu du badge (en minuscule) à une variante.
  // 3. Si rien ne correspond, on utilise 'light' comme couleur par défaut.
  const badgeVariant = 
    variant || 
    STATUS_TO_VARIANT_MAP[String(children).toLowerCase()] || 
    'light';

  // Construit les classes CSS
  const badgeClasses = `
    fw-semibold 
    ${size === 'sm' ? 'px-2 py-1' : ''}
    ${size === 'lg' ? 'fs-6 px-3 py-2' : ''}
    ${className}
  `;

  return (
    <BootstrapBadge bg={badgeVariant} className={badgeClasses.trim()}>
      {children}
    </BootstrapBadge>
  );
};

// Définition des PropTypes pour la documentation et la validation.
Badge.propTypes = {
  /** Le contenu textuel du badge. */
  children: PropTypes.node.isRequired,
  /** Variante de couleur Bootstrap. Prioritaire sur le mapping automatique. */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  /** Taille du badge. */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Classes CSS additionnelles. */
  className: PropTypes.string,
};

// Valeurs par défaut.
Badge.defaultProps = {
  variant: undefined,
  size: 'md',
  className: '',
};

export default Badge;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

const MyPageComponent = () => {
  return (
    <div className="p-4 d-flex align-items-center gap-3">
      {/* Utilisation du mapping automatique */
     // <p>Statut facture : <Badge>Payée</Badge></p>
     // <p>Statut commande : <Badge>Brouillon</Badge></p>
    //  <p>Statut stock : <Badge>Stock Faible</Badge></p>
   //   <p>Rôle utilisateur : <Badge>Admin</Badge></p>
    //  <p>Statut inconnu : <Badge>Archivé</Badge></p> {/* Utilise le fallback 'light' */}

      {/* Forcer une variante de couleur spécifique */}
   //   <p>
    //    Tag: <Badge variant="info" size="sm">Nouveauté</Badge>
   //   </p>
  //  </div>
//  );
//};

