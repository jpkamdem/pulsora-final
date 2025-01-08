import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-1/4 h-[30dvh] m-auto mt-16">
        <p className="text-2xl">
          <span className="font-bold">ERROR 404:</span> Page inconnue
        </p>
        <button className="bg-slate-800 p-6 text-white mt-6 hover:bg-white hover:text-slate-800">
          <Link to="/">Retourner à l'accueil</Link>
        </button>
      </div>
    </>
  );
}
