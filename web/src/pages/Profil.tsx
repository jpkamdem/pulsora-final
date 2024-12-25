import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TokenType, UserType } from "./Auth";

export default function Profil() {
  const [userDatas, setUserDatas] = useState<UserType[] | null>(null);

  async function fetchUsers() {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => setUserDatas(res));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    console.log("Il n'y a pas de token dans le local storage");
    return;
  }

  const decodedToken: TokenType = JSON.parse(storedToken);

  return (
    <>
      {storedToken ? (
        <>
          {" "}
          <section>
            <ul>
              <li>ID : {decodedToken.id}</li>
              <li>Nom d'utilisateur : {decodedToken.username} </li>
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
