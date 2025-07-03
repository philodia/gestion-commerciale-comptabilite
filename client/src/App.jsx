// client/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';

// Importons un peu de style pour le layout principal
import './App.css'; 

// ===================================================================
// DÉFINITION DES LAYOUTS
// ===================================================================

/**
 * Le Layout Principal pour les utilisateurs connectés.
 * Il contient la structure globale (sidebar, header) et un <Outlet />.
 * L'<Outlet /> est un placeholder où React Router affichera le composant
 * de la route enfant correspondante (ex: Dashboard, ClientsList, etc.).
 */
const ProtectedLayout = () => {
  // NOTE : La logique de protection sera ajoutée ici plus tard.
  // Pour l'instant, nous affichons simplement le layout.
  // const { isAuthenticated } = useAuth(); // Exemple de future logique
  // if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h1 className="sidebar-brand">GestionPro</h1>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-link">Tableau de Bord</Link>
          <Link to="/ventes" className="nav-link">Ventes</Link>
          <Link to="/clients" className="nav-link">Clients</Link>
          <Link to="/produits" className="nav-link">Produits</Link>
          <Link to="/comptabilite" className="nav-link">Comptabilité</Link>
        </nav>
      </aside>
      <div className="main-panel">
        <header className="app-header">
          <div>Recherche...</div>
          <div>Profil Utilisateur</div>
        </header>
        <main className="content-wrapper">
          {/* C'est ici que les pages protégées seront rendues */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};


// ===================================================================
// DÉFINITION DES PAGES (PLACEHOLDERS)
// ===================================================================
// Pour l'instant, ce sont de simples composants.
// Plus tard, ils seront déplacés dans leurs propres fichiers dans src/pages/

const LoginPage = () => (
  <div className="vh-100 d-flex justify-content-center align-items-center">
    <h1>Page de Connexion</h1>
  </div>
);

const DashboardPage = () => <h2>Tableau de Bord Principal</h2>;
const SalesPage = () => <h2>Module des Ventes</h2>;
const ClientsPage = () => <h2>Module des Clients</h2>;
const ProductsPage = () => <h2>Module des Produits</h2>;
const AccountingPage = () => <h2>Module de Comptabilité</h2>;
const NotFoundPage = () => (
  <div className="vh-100 d-flex justify-content-center align-items-center">
    <h1>404 - Page non trouvée</h1>
  </div>
);


// ===================================================================
// COMPOSANT APP PRINCIPAL (ORCHESTRATEUR DE ROUTES)
// ===================================================================

function App() {
  return (
    <Routes>
      {/* Route publique pour la connexion */}
      <Route path="/login" element={<LoginPage />} />

      {/* 
        Route parente qui utilise notre ProtectedLayout.
        Toutes les routes imbriquées à l'intérieur hériteront de ce layout.
        Leur contenu sera affiché à la place de <Outlet />.
      */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/ventes" element={<SalesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/produits" element={<ProductsPage />} />
        <Route path="/comptabilite" element={<AccountingPage />} />
        {/* Ajoutez toutes vos autres routes protégées ici */}
      </Route>

      {/* Route "Catch-all" pour les URLs non trouvées */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;