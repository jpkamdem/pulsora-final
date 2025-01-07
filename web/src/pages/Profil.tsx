import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode"; 


export default function Profil() {
  const [decodedToken, setDecodedToken] = useState<TokenType | null>(null);
  const navigate = useNavigate(); 
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

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    console.log("Déconnexion réussie");
    navigate("/authentification"); 
  };

  const handleLoginRedirect = () => {
    navigate("/authentification"); 
  };

  return (
    <div className="p-8  bg-gray-100">
      {decodedToken ? (
        <>
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

          <div className="text-center mt-6">
            <button onClick={handleLogout} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
              Se déconnecter
            </button>
          </div>

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
          <p className="text-red-600 font-bold text-center mt-8">
            Aucun token trouvé. Vous n'êtes pas connecté.
          </p>

          <div className="text-center mt-6">
            <button onClick={handleLoginRedirect} className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4  mb-20">
              Se connecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}
  