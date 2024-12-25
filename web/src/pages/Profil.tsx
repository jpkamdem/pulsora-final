import { Link, Outlet } from "react-router-dom";

export default function Profil() {
  return (
    <>
      <section>
        <p>Username : test</p>
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
  );
}
