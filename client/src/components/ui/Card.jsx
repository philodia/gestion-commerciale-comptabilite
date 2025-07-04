// client/src/components/ui/Card.jsx

import React from 'react';
import { Card as BootstrapCard, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Un composant Card réutilisable pour encapsuler des contenus.
 * Il gère un titre, des actions, un pied de page, et un état de chargement.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} [props.title] - Le titre à afficher dans l'en-tête de la carte.
 * @param {React.ReactNode} [props.actions] - Des éléments (boutons, dropdowns) à afficher à droite du titre.
 * @param {React.ReactNode} props.children - Le contenu principal de la carte.
 * @param {React.ReactNode} [props.footer] - Le contenu à afficher dans le pied de page de la carte.
 * @param {boolean} [props.isLoading=false] - Si true, affiche une surcouche de chargement sur le corps de la carte.
 * @param {string} [props.className=''] - Classes CSS supplémentaires à appliquer à la carte.
 */
const Card = ({ title, actions, children, footer, isLoading = false, className = '' }) => {
  return (
    <BootstrapCard className={`shadow-sm h-100 ${className}`}>
      {(title || actions) && (
        <BootstrapCard.Header className="d-flex justify-content-between align-items-center">
          {title && <BootstrapCard.Title as="h5" className="mb-0">{title}</BootstrapCard.Title>}
          {actions && <div>{actions}</div>}
        </BootstrapCard.Header>
      )}

      <BootstrapCard.Body style={{ position: 'relative' }}>
        {isLoading && (
          <div 
            className="d-flex justify-content-center align-items-center"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 10,
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </Spinner>
          </div>
        )}
        {children}
      </BootstrapCard.Body>

      {footer && (
        <BootstrapCard.Footer className="text-muted">
          {footer}
        </BootstrapCard.Footer>
      )}
    </BootstrapCard>
  );
};

// Définition des PropTypes pour la documentation et la validation.
Card.propTypes = {
  /** Le titre de la carte, affiché dans l'en-tête. */
  title: PropTypes.node,
  /** Des éléments d'action (boutons, etc.) à afficher dans l'en-tête. */
  actions: PropTypes.node,
  /** Le contenu principal de la carte. */
  children: PropTypes.node.isRequired,
  /** Le contenu du pied de page. */
  footer: PropTypes.node,
  /** Affiche un overlay de chargement sur le corps de la carte. */
  isLoading: PropTypes.bool,
  /** Classes CSS additionnelles. */
  className: PropTypes.string,
};

// Valeurs par défaut.
Card.defaultProps = {
  title: null,
  actions: null,
  footer: null,
  isLoading: false,
  className: '',
};

export default Card;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import Button from './Button'; // En supposant l'existence de notre composant Button
import { FaEdit, FaSync } from 'react-icons/fa';

const MyPageComponent = () => {
  return (
    <div className="p-4 bg-light">
      <div className="row g-4">
        {/* Exemple 1: Carte simple pour un formulaire */
        {/*<div className="col-md-6">
          <Card 
            title="Informations Client"
            actions={<Button variant="link" size="sm" icon={<FaEdit />}>Modifier</Button>}
          >
            <p><strong>Nom :</strong> Moussa Diop</p>
            <p><strong>Email :</strong> moussa.diop@example.sn</p>
            <p><strong>Téléphone :</strong> +221 77 123 45 67</p>
          </Card>
        </div>

        {/* Exemple 2: Carte avec état de chargement et pied de page */
        /*<div className="col-md-6">
          <Card 
            title="Statistiques de Ventes"
            actions={<Button variant="outline-secondary" size="sm" icon={<FaSync />} />}
            footer="Données mises à jour il y a 5 minutes"
            isLoading={true}
          >
            {/* Le contenu ici sera masqué par le spinner */
            /*<p>CA du mois : 12,500,000 FCFA</p>
            <p>Nouveaux clients : 12</p>
          </Card>
        </div>*/}