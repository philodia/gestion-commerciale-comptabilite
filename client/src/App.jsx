// client/src/App.jsx (Version Corrigée)

import React from 'react';
// On retire BrowserRouter d'ici car il est déjà dans main.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

// --- Importation des Layouts et Pages ---
import MainLayout from './components/common/Layout';
import LoginPage from './pages/auth/Login';
import DashboardPage from './pages/Dashboard';

// ===================================================================
// COMPOSANT DE ROUTE PROTÉGÉE
// ===================================================================

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// ===================================================================
// COMPOSANT APP PRINCIPAL (ORCHESTRATEUR DE ROUTES)
// ===================================================================

function App() {
  // On retire le <Router> qui enveloppait tout. On commence directement avec <Routes>.
  return (
    <Routes>
      {/* --- Routes Publiques --- */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* --- Routes Protégées --- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          {/* Exemples de futures routes */}
          {/* <Route path="/clients" element={<ClientsListPage />} /> */}
        </Route>
      </Route>
      
      {/* --- Route "Catch-all" (404) --- */}
      <Route path="*" element={
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <h1>404 - Page Non Trouvée</h1>
        </div>
      } />
    </Routes>
  );
}

export default App;