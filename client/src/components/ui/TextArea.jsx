// client/src/components/ui/TextArea.jsx

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Un composant de zone de texte (Textarea) réutilisable pour les formulaires.
 * Partage une API cohérente avec les composants Input et Select.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.id - L'ID unique pour le champ et le label.
 * @param {string} props.label - Le texte à afficher dans le <label>.
 * @param {string} props.name - L'attribut 'name' du champ.
 * @param {string} props.value - La valeur actuelle du champ (contrôlé).
 * @param {function} props.onChange - La fonction à appeler lors d'un changement de valeur.
 * @param {string} [props.placeholder] - Le texte d'aide affiché dans le champ.
 * @param {string} [props.error] - Le message d'erreur à afficher sous le champ.
 * @param {number} [props.rows=3] - Le nombre de lignes visibles par défaut.
 * @param {boolean} [props.disabled=false] - Pour désactiver le champ.
 * @param {boolean} [props.required=false] - Pour marquer le champ comme obligatoire.
 * @param {string} [props.className=''] - Classes CSS supplémentaires pour le conteneur du groupe.
 */
const TextArea = ({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  rows = 3,
  disabled = false,
  required = false,
  className = '',
  ...rest // Pour toutes les autres props natives de <textarea>
}) => {

  const hasError = !!error;

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        {...rest}
      />
      {hasError && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
};

// Définition des PropTypes pour la documentation et la validation.
TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

// Valeurs par défaut.
TextArea.defaultProps = {
  placeholder: '',
  error: null,
  rows: 3,
  disabled: false,
  required: false,
  className: '',
};

export default TextArea;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import { useState } from 'react';
import Button from './Button';
import Card from './Card';

const MyFormComponent = () => {
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('Ce champ ne peut pas être vide.');

  return (
    <div className="p-4">
    <Card title="Détails du Produit">
      <form>
        <TextArea
          id="description"
          label="Description du produit"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Entrez une description détaillée du produit..."
          rows={5}
          required
        />
        
        <TextArea
          id="notes"
          label="Notes internes (optionnel)"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes visibles uniquement par l'équipe..."
          error={error} // Exemple avec une erreur
        />

        <Button type="submit">Sauvegarder</Button>
      </form>
    </Card>
    </div>
  );
};
*/