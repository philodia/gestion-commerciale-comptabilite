// client/src/App.jsx

import React from 'react';

// On importe notre composant central qui gère toutes les routes de l'application.
import AppRoutes from './routes';

// On importe les styles globaux qui s'appliquent à toute l'application.
//import './App.css'; 

/**
 * Le composant racine de l'application.
 * 
 * Après refactoring, son rôle est minimaliste :
 * 1. Importer les styles globaux.
 * 2. Rendre le composant AppRoutes, qui contient toute la logique de routage.
 * 
 * C'est le sommet de l'arbre des composants de notre application.
 */
function App() {
  return <AppRoutes />;
}

export default App;