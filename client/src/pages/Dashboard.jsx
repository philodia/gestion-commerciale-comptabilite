// client/src/pages/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div>
      <h2>Tableau de Bord</h2>
      <hr />
      {user ? (
        <h3>Bienvenue, {user.nom} !</h3>
      ) : (
        <p>Chargement des informations utilisateur...</p>
      )}
      <p>Votre rôle est : <strong>{user?.role}</strong></p>
      <p>C'est ici que les KPIs et les graphiques apparaîtront.</p>
    </div>
  );
};

export default DashboardPage;