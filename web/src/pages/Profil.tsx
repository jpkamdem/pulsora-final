// import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode";

export default function Profil() {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    console.log("Il n'y a pas de token dans le local storage");
    return;
  }
  const decodedToken: TokenType = jwtDecode(storedToken);

  return (
    <>
      {storedToken ? (
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
