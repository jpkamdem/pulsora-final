// import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Profil() {
  const [decodedToken, setDecodedToken] = useState<TokenType | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("Aucun token trouvé dans le localstorage");
      return;
    }

    const token: TokenType = jwtDecode(storedToken);

    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp < currentTime) {
      console.log("Token expiré");
      localStorage.removeItem("token");
      setDecodedToken(null);
    } else {
      setDecodedToken(token);
    }
  }, []);

  return (
    <>
      {decodedToken ? (
        <>
          {" "}
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
          <div className="p-8">
            <ul className="flex justify-around">
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
          </div>
          <Outlet />
        </>
      ) : (
        <>
          <p>Veuillez vous authentifier</p>
        </>
      )}
    </>
  );
}
