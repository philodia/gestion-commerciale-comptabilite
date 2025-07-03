// server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Bibliothèque pour le hachage de mot de passe

/**
 * Schéma Mongoose pour le modèle Utilisateur.
 * Définit la structure, les types de données et les règles de validation
 * pour les documents utilisateurs dans la collection MongoDB.
 */
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom complet de l\'utilisateur est obligatoire.'],
    trim: true, // Supprime les espaces en début et fin de chaîne
  },
  email: {
    type: String,
    required: [true, 'L\'adresse email est obligatoire.'],
    unique: true, // Assure que chaque email est unique dans la collection
    lowercase: true, // Convertit l'email en minuscules pour la cohérence
    trim: true,
    // Valide le format de l'email avec une expression régulière
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Veuillez fournir une adresse email valide.'],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire.'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères.'],
    // 'select: false' empêche ce champ d'être retourné par défaut
    // dans les requêtes find(). C'est une mesure de sécurité cruciale.
    select: false,
  },
  role: {
    type: String,
    // 'enum' restreint le champ 'role' aux seules valeurs de cette liste.
    enum: {
      values: ['Vendeur', 'Commercial', 'Comptable', 'Admin'],
      message: 'Le rôle "{VALUE}" n\'est pas supporté.'
    },
    default: 'Vendeur', // Rôle par défaut pour les nouveaux utilisateurs
  },
  actif: {
    type: Boolean,
    default: true, // Les nouveaux utilisateurs sont actifs par défaut
  },
  // 'timestamps: true' ajoute automatiquement les champs 'createdAt' et 'updatedAt'.
}, { timestamps: true });


// ===================================================================
// MIDDLEWARE MONGOOSE (HOOKS)
// ===================================================================

/**
 * Middleware "pre-save" : Ce code s'exécute automatiquement AVANT qu'un document
 * utilisateur ne soit sauvegardé dans la base de données.
 * Son rôle est de hacher le mot de passe si celui-ci a été modifié.
 */
userSchema.pre('save', async function(next) {
  // On exécute cette fonction uniquement si le mot de passe a été modifié (ou est nouveau)
  if (!this.isModified('password')) {
    return next(); // Passe au middleware suivant sans rien faire
  }

  // Génère un "salt" pour renforcer la sécurité du hachage. 10 est un bon coût de calcul.
  const salt = await bcrypt.genSalt(10);
  
  // Hache le mot de passe de l'utilisateur avec le salt et le remplace
  this.password = await bcrypt.hash(this.password, salt);

  // Appelle le prochain middleware dans la chaîne
  next();
});


// ===================================================================
// MÉTHODES D'INSTANCE
// ===================================================================

/**
 * Méthode d'instance pour comparer un mot de passe candidat (fourni lors du login)
 * avec le mot de passe haché stocké dans la base de données.
 * @param {string} enteredPassword - Le mot de passe entré par l'utilisateur.
 * @returns {Promise<boolean>} - True si les mots de passe correspondent, sinon false.
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
  // bcrypt.compare s'occupe de tout : il compare le mot de passe en clair
  // avec le hash, en utilisant le salt qui est intégré dans le hash.
  return await bcrypt.compare(enteredPassword, this.password);
};


// Crée et exporte le modèle User à partir du schéma
const User = mongoose.model('User', userSchema);
module.exports = User;