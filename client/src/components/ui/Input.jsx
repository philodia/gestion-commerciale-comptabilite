// client/src/components/ui/Input.jsx

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Un composant de champ de saisie (Input) réutilisable et complet.
 * Gère le label, l'icône, le message d'erreur et les props HTML standards.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.id - L'ID unique pour le champ et le label.
 * @param {string} props.label - Le texte à afficher dans le <label>.
 * @param {string} props.name - L'attribut 'name' du champ, utile pour les formulaires.
 * @param {string} props.value - La valeur actuelle du champ (contrôlé).
 * @param {function} props.onChange - La fonction à appeler lors d'un changement de valeur.
 * @param {string} [props.type='text'] - Le type de l'input (text, password, email, number, etc.).
 * @param {string} [props.placeholder] - Le texte d'aide affiché dans le champ.
 * @param {string} [props.error] - Le message d'erreur à afficher sous le champ.
 * @param {React.ReactNode} [props.icon] - Une icône à afficher à l'intérieur du champ.
 * @param {boolean} [props.disabled=false] - Pour désactiver le champ.
 * @param {boolean} [props.required=false] - Pour marquer le champ comme obligatoire.
 * @param {string} [props.className=''] - Classes CSS supplémentaires pour le conteneur du groupe.
 */
const Input = ({
  id,
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  icon,
  disabled = false,
  required = false,
  className = '',
  ...rest // Pour toutes les autres props natives de <input>
}) => {

  const hasError = !!error;
  const hasIcon = !!icon;

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className={`input-group ${hasError ? 'is-invalid' : ''}`}>
        {hasIcon && (
          <span className="input-group-text">
            {icon}
          </span>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          {...rest}
        />
      </div>
      {hasError && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
};

// Définition des PropTypes pour la documentation et la validation.
Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

// Valeurs par défaut.
Input.defaultProps = {
  type: 'text',
  placeholder: '',
  error: null,
  icon: null,
  disabled: false,
  required: false,
  className: '',
};

export default Input;

/*
// ===================================================================
// EXEMPLE D'UTILISATION
// ===================================================================

import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Button from './Button';
import Card from './Card';

const MyFormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: 'test@invalid',
    password: '123',
  });

  const [errors, setErrors] = useState({
      email: 'Veuillez entrer une adresse email valide.',
      password: 'Le mot de passe doit contenir au moins 6 caractères.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
    <Card title="Créer un compte">
      <form>
        <Input
          id="name"
          label="Nom complet"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Mariama Sarr"
          icon={<FaUser />}
          required
        />
        <Input
          id="email"
          label="Adresse Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ex: mariama@example.com"
          icon={<FaEnvelope />}
          error={errors.email}
          required
        />
        <Input
          id="password"
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          icon={<FaLock />}
          error={errors.password}
          required
        />
        <Button type="submit">S'inscrire</Button>
      </form>
    </Card>
    </div>
  );
};
*/