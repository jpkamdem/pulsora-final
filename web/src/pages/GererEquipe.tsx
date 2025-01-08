import { Link, Outlet } from "react-router-dom"; 

export default function GererEquipe() {
  return (
    <div className="w-3/5 mx-auto p-8 bg-white rounded-lg shadow-lg relative">
      <Link to="/profil">
        <button
          className="absolute top-4 right-4 text-blue-600 hover:text-blue-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </Link>

      <h2 className="text-center pb-4 text-2xl mt-2">Gestion des équipes</h2>

      <section className="flex justify-evenly">
        <Link to="/profil/equipes/creer">
          <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg w-full">
            <p>Créer</p>
          </div>
        </Link>
        <Link to="/profil/equipes/editer">
          <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg w-full">
            <p className="capitalize">éditer</p>
          </div>
        </Link>
      </section>

      <Outlet />
    </div>
  );
}
