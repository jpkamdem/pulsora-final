import { Link, Outlet } from "react-router-dom";

export default function GererArticle() {
  return (
    <>
      <h2 className="text-center pb-4 text-2xl">Gestion des articles</h2>
      <section className="flex justify-evenly">
        <Link to="/profil/articles/creer">
          <div className="p-6 bg-slate-800 text-white text-lg font-bold hover:bg-white hover:text-slate-800">
            <p>Créer</p>
          </div>
        </Link>
        <Link to="/profil/articles/editer">
          <div className="p-6 bg-slate-800 text-white text-lg font-bold hover:bg-white hover:text-slate-800">
            <p className="capitalize">éditer</p>
          </div>
        </Link>
      </section>
      <Outlet />
    </>
  );
}