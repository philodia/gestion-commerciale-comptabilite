import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // --- Plugins ---
  // On déclare ici les plugins que Vite doit utiliser.
  // @vitejs/plugin-react est essentiel pour les projets React.
  // Il permet la compilation JSX, le Hot Module Replacement (HMR ou "Fast Refresh"), etc.
  plugins: [react()],

  // --- Configuration du Serveur de Développement ---
  server: {
    // On définit un port fixe pour le serveur de développement du client.
    // C'est plus prévisible que de laisser Vite en choisir un au hasard.
    port: 3000,

    // --- Configuration du Proxy ---
    // C'est la partie la plus importante pour la communication avec notre API.
    // Elle résout les problèmes de CORS en développement.
    proxy: {
      // Toutes les requêtes qui commencent par '/api' seront interceptées
      // et redirigées vers notre serveur backend.
      '/api': {
        // La cible de la redirection : l'URL de notre serveur Node.js.
        target: 'http://localhost:5001',
        
        // Indispensable. Modifie l'en-tête 'Origin' de la requête pour qu'elle corresponde à la cible.
        // Sans cela, de nombreux serveurs backend rejettent la requête.
        changeOrigin: true,

        // Si votre API backend utilise HTTPS avec un certificat auto-signé,
        // cette option permet d'ignorer la validation du certificat.
        // Même pour HTTP, il est bon de l'inclure, cela ne cause aucun tort.
        secure: false,

        // Optionnel : Si votre API backend n'a pas le préfixe '/api' sur ses routes
        // (par exemple, si la route est '/users' au lieu de '/api/users'),
        // vous pouvez le supprimer ici. Dans notre cas, nous gardons '/api' côté serveur,
        // donc nous n'avons pas besoin de 'rewrite'.
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});