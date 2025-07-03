// ===================================================================
// POINT D'ENTRÉE DE L'APPLICATION REACT
// ===================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// --- Styles Globaux ---
// 1. On importe le CSS de Bootstrap pour qu'il soit appliqué à toute l'application.
// L'ordre est important : d'abord la bibliothèque, ensuite nos styles personnalisés.
import 'bootstrap/dist/css/bootstrap.min.css';
// 2. On peut créer un fichier index.css pour nos propres styles globaux.
import './index.css';

// --- Composant Racine ---
import App from './App.jsx';

// --- Store Redux ---
// On importe le store que nous venons de configurer.
import { store } from './store';


// --- Rendu de l'Application ---
// On récupère l'élément HTML racine où notre application sera injectée.
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// On utilise ReactDOM.render pour injecter notre arbre de composants.
root.render(
  // React.StrictMode est un outil pour mettre en évidence les problèmes potentiels
  // dans une application. Il active des vérifications et des avertissements supplémentaires.
  <React.StrictMode>

    {/* 
      Le Provider rend le store Redux disponible à tous les composants
      qui pourraient en avoir besoin, sans avoir à passer les props manuellement.
    */}
    <Provider store={store}>

      {/* 
        Le Router enveloppe notre application pour activer le routage côté client.
        Tous les composants qui utilisent des hooks de routage (useNavigate, useLocation)
        ou des composants (<Link>, <Route>) doivent être à l'intérieur de ce composant.
      */}
      <Router>
        <App />
      </Router>

    </Provider>

  </React.StrictMode>
);