// client/src/components/ui/Select.jsx

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Un composant de champ de sélection (Select) réutilisable.
 * Piloté par un tableau d'options, il gère le label, l'erreur, et l'état de chargement.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.id - L'ID unique pour le champ et le label.
 * @param {string} props.label - Le texte à afficher dans le <label>.
 * @param {string} props.name - L'attribut 'name' du champ.
 * @param {string|number} props.value - La valeur actuelle du champ (contrôlé).
 * @param {function} props.onChange - La fonction à appeler lors d'un changement de valeur.
 * @param {Array<object>} props.options - Le tableau d'options à afficher. Chaque objet doit avoir une `value` et un `label`.
 * @param {string} [props.placeholder] - Un texte pour l'option par défaut (désactivée).
 * @param {string} [props.error] - Le message d'erreur à afficher sous le champ.
 * @param {boolean} [props.disabled=false] - Pour désactiver le champ.
 * @param {boolean} [props.isLoading=false] - Si true, désactive le champ et peut être utilisé pour afficher un état de chargement.
 * @param {boolean} [props.required=false] - Pour marquer le champ comme obligatoire.
 * @param {string} [props.className=''] - Classes CSS supplémentaires pour le conteneur du groupe.
 */
const Select = ({
  id,
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
  isLoading = false,
  required = false,
  className = '',
  ...rest
}) => {

  const hasError = !!error;
  const isDisabled = disabled || isLoading;

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        required={required}
        className={`form-select ${hasError ? 'is-invalid' : ''}`}
        {...rest}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="form-text">Chargement des options...</div>
      )}
    </div>
  );
};

// Définition des PropTypes pour la documentation et la validation.
Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

// Valeurs par défaut.
Select.defaultProps = {
  placeholder: '',
  error: null,
  disabled: false,
  isLoading: false,
  required: false,
  className: '',
};

export default Select;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import { useState } from 'react';
import Button from './Button';
import Card from './Card';

const MyFormComponent = () => {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('brouillon');

  const categoriesOptions = [
    { value: 'cat1', label: 'Électronique' },
    { value: 'cat2', label: 'Mobilier' },
    { value: 'cat3', label: 'Fournitures de bureau' },
  ];
  
  const statusOptions = [
      { value: 'brouillon', label: 'Brouillon' },
      { value: 'envoyee', label: 'Envoyée' },
      { value: 'payee', label: 'Payée' },
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') setCategory(value);
    if (name === 'status') setStatus(value);
  };

  return (
    <div className="p-4">
    <Card title="Ajouter un Produit">
      <form>
        <Select
          id="category"
          label="Catégorie de produit"
          name="category"
          value={category}
          onChange={handleChange}
          options={categoriesOptions}
          placeholder="-- Veuillez choisir une catégorie --"
          required
        />

        <Select
          id="status"
          label="Statut de la facture"
          name="status"
          value={status}
          onChange={handleChange}
          options={statusOptions}
          error="Ce champ est requis."
        />
        
        <Select
          id="loading-select"
          label="Options en chargement"
          name="loading"
          value=""
          onChange={() => {}}
          options={[]}
          isLoading={true}
        />

        <Button type="submit">Enregistrer</Button>
      </form>
    </Card>
    </div>
  );
};
*/