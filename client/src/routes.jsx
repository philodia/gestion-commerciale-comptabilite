// client/src/routes.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Hook pour la logique d'authentification
import { useAuth } from './hooks/useAuth';

// Composant de Layout principal
import Layout from './components/common/Layout';

// Importation des différentes pages de l'application
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';

// TODO: Remplacer ces placeholders par de vrais composants de page dans le futur.
const DashboardPage = () => <div className="p-4"><h2>Tableau de Bord</h2></div>;
const SalesPage = () => <div className="p-4"><h2>Module des Ventes</h2></div>;
const ClientsPage = () => <div className="p-4"><h2>Module des Clients</h2></div>;
const ProductsPage = () => <div className="p-4"><h2>Module des Produits</h2></div>;
const AccountingPage = () => <div className="p-4"><h2>Module de Comptabilité</h2></div>;
const ReportsPage = () => <div className="p-4"><h2>Module des Rapports</h2></div>;
const SettingsPage = () => <div className="p-4"><h2>Module des Paramètres</h2></div>;
const NotFoundPage = () => <div className="p-4"><h1>404 - Page non trouvée</h1></div>;


/**
 * Composant "Gardien" pour les routes protégées.
 * Il vérifie si l'utilisateur est authentifié avant de donner accès.
 * S'il est authentifié, il rend le Layout principal (qui contient un <Outlet />).
 * Sinon, il redirige l'utilisateur vers la page de connexion.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // On affiche un état de chargement pendant que le hook vérifie le token
  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Chargement...</div>;
  }

  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
};


/**
 * Le composant principal qui définit toutes les routes de l'application.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* --- Routes Publiques --- */}
      {/* Ces routes sont accessibles à tous, même aux utilisateurs non connectés. */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Vous pourriez ajouter ici /forgot-password, etc. */}


      {/* --- Routes Protégées --- */}
      {/* On utilise un Route parent avec le gardien 'ProtectedRoute'.
          Toutes les routes imbriquées hériteront de la protection et du Layout. */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/ventes" element={<SalesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/produits" element={<ProductsPage />} />
        <Route path="/comptabilite" element={<AccountingPage />} />
        <Route path="/rapports" element={<ReportsPage />} />
        <Route path="/parametres" element={<SettingsPage />} />
        {/* Ajoutez ici toutes vos futures pages qui nécessitent une connexion */}
      </Route>


      {/* --- Route pour les pages non trouvées (404) --- */}
      {/* Cette route doit toujours être la dernière. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;