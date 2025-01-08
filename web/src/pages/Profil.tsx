import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"; // Ajoutez useLocation
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode"; 

export default function Profil() {
  const [decodedToken, setDecodedToken] = useState<TokenType | null>(null);
  const [showButtons, setShowButtons] = useState(true); // Etat pour gérer la visibilité des boutons
  const navigate = useNavigate(); 
  const location = useLocation(); // Permet de savoir où nous nous trouvons

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.log("Aucun token trouvé dans le localstorage");
      setDecodedToken(null);
      return;
    }

    try {
      const token: TokenType = jwtDecode(storedToken); 
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

  // Lorsqu'on change de route, on cache les boutons si on n'est pas sur "/profil"
  useEffect(() => {
    if (location.pathname !== "/profil") {
      setShowButtons(false);
    } else {
      setShowButtons(true);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    console.log("Déconnexion réussie");
    navigate("/authentification"); 
  };

  const handleLoginRedirect = () => {
    navigate("/authentification"); 
  };

  return (
    <div className="p-8 bg-slate-100  ">
      {decodedToken ? (
        <>
          <div className="text-3xl text-center text-blue-800">
            MON COMPTE 
          </div>
          <div>
            <ul>
              <li>
                <p>Nom d'utilisateur : {decodedToken.username}</p>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button onClick={handleLogout} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
              Se déconnecter
            </button>
          </div>

          {showButtons && (
            <div  className="flex justify-center ">
                <ul className="">
                  <Link to="/profil/articles">
                    <li className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 mb-1 rounded-lg w-full">
                      Gestion des articles
                    </li>
                  </Link>

                  <Link to="/profil/equipes">
                    <li className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 my-2 rounded-lg w-full">
                      Gestion des équipes
                    </li>
                  </Link>

                  <Link to="/profil/joueurs">
                    <li className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 mt-1 rounded-lg w-full">
                      Gestion des joueurs
                    </li>
                  </Link>
                </ul>

            </div>

          )}

          <Outlet />
        </>
      ) : (
        <>
          <p className="text-red-600 font-bold text-center mt-8">
            Vous n'êtes pas connecté.
          </p>

          <div className="text-center mt-6">
            <button onClick={handleLoginRedirect} className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 mb-20">
              Se connecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}
