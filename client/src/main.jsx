// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// --- Store Redux ---
// On importe le store global que nous avons configuré.
import { store } from './store';

// --- Composant Racine ---
// On importe le composant App qui est maintenant le point d'entrée de notre arbre de composants.
import App from './App.jsx';

// --- Styles Globaux ---
// 1. On importe le CSS de Bootstrap pour qu'il soit appliqué à toute l'application.
// Cet import doit être fait une seule fois, ici.
import 'bootstrap/dist/css/bootstrap.min.css';
// 2. On importe notre propre fichier de styles globaux (si nécessaire).
import './index.css';


// --- Rendu de l'Application ---
// On cible l'élément HTML racine où notre application sera "montée".
// Cet élément se trouve dans `client/public/index.html`.
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// On effectue le rendu de l'application.
root.render(
  // React.StrictMode est un outil pour mettre en évidence les problèmes potentiels
  // dans une application. Il active des vérifications et des avertissements supplémentaires
  // uniquement en mode développement et n'a aucun impact sur le build de production.
  <React.StrictMode>

    {/* 
      Le <Provider> est un composant de 'react-redux'. Il rend le store Redux 
      disponible à tous les composants descendants qui en ont besoin,
      via les hooks `useSelector` et `useDispatch`.
    */}
    <Provider store={store}>

      {/* 
        Le <Router> (alias de BrowserRouter) est un composant de 'react-router-dom'.
        Il active le routage côté client, en utilisant l'API History du navigateur
        pour garder l'UI synchronisée avec l'URL. Tous nos composants de route
        (<Routes>, <Route>, <Link>) doivent être à l'intérieur de ce composant.
      */}
      <Router>
        <App />
      </Router>

    </Provider>
    
  </React.StrictMode>
);