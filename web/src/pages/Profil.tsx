import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode"; // Votre style d'import

export default function Profil() {
  const [decodedToken, setDecodedToken] = useState<TokenType | null>(null);
  const navigate = useNavigate(); // Utilisé pour les redirections

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.log("Aucun token trouvé dans le localstorage");
      setDecodedToken(null); // Si aucun token n'est trouvé, on met le state à null
      return;
    }

    try {
      const token: TokenType = jwtDecode(storedToken); // Décodage du token
      const currentTime = Math.floor(Date.now() / 1000);

      if (token.exp < currentTime) {
        console.log("Token expiré");
        localStorage.removeItem("token");
        setDecodedToken(null);
      } else {
        setDecodedToken(token);
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      localStorage.removeItem("token");
      setDecodedToken(null);
    }
  }, []);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    console.log("Déconnexion réussie");
    navigate("/authentification"); // Redirige vers la page d'authentification
  };

  // Fonction pour rediriger vers la page de connexion si non connecté
  const handleLoginRedirect = () => {
    navigate("/authentification"); // Redirige vers la page de connexion
  };

  return (
    <div className="p-8">
      {decodedToken ? (
        <>
          {/* Affiche les informations de l'utilisateur si connecté */}
          <section>
            <ul>
              <li>
                <p>ID : {decodedToken.id}</p>
              </li>
              <li>
                <p>Nom d'utilisateur : {decodedToken.username}</p>
              </li>
            </ul>
          </section>

          {/* Bouton de déconnexion */}
          <div className="text-center mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            >
              Se déconnecter
            </button>
          </div>

          {/* Liens vers la gestion des articles, équipes, et joueurs */}
          <ul className="flex justify-around mt-8">
            <Link to="/profil/articles">
              <li className="p-8 font-bold border-r-4 border-r-slate-800 hover:bg-slate-600 hover:text-white">
                Gestion des articles
              </li>
            </Link>

            <Link to="/profil/equipes">
              <li className="p-8 font-bold border-r-4 border-r-slate-800 hover:bg-slate-600 hover:text-white">
                Gestion des équipes
              </li>
            </Link>

            <Link to="/profil/joueurs">
              <li className="p-8 font-bold border-r-4 border-r-slate-800 hover:bg-slate-600 hover:text-white">
                Gestion des joueurs
              </li>
            </Link>
          </ul>

          <Outlet />
        </>
      ) : (
        <>
          {/* Message affiché si non connecté */}
          <p className="text-red-600 font-bold text-center">
            Aucun token trouvé. Vous n'êtes pas connecté.
          </p>

          {/* Bouton pour rediriger vers la page de connexion */}
          <div className="text-center mt-6">
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Se connecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}
  