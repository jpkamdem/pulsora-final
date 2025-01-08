import playerHome from "../assets/playerhome.png";
import img2 from "../assets/img2.jpg";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-slate-100">
        <div className="flex justify-center lg:items-center relative py-10">
          <img className="w-3/6 md:w-2/6" src={playerHome} alt="Player Home" />
          <div className="text-center absolute bottom-0 lg:relative">
            <h1 className="text-4xl font-bold lg:text-8xl">PULSORA</h1>
            <h2 className="text-3xl font-semibold lg:text-3xl text-blue-900">
            L'univers du football, à portée de main !
            </h2>
          </div>
        </div>

        <div className="mb-20 text-center">
          <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-3xl lg:text-xl lg:px-6 lg:py-3 lg:rounded-full">
            DECOUVRIR
          </button>
        </div>



        <div className="bg-white text-blue-900 p-10 lg:p-20 flex flex-col lg:flex-row gap-10 items-center ">
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold lg:text-5xl mb-4 ">
            Gestion des équipes sportives            </h2>
            <p className="text-lg lg:text-xl mb-6">
            Pulsora facilite la gestion des équipes sportives, l’organisation des entraînements 
            et la communication entre entraîneurs, joueurs et responsables, tout en permettant aux 
            fans de suivre l’actualité des équipes et des joueurs
            </p>

          </div>

          <div className="flex-1 relative">
            <img className="w-5/6 md:w-4/6 rounded-lg shadow-lg ml-20"  src={img2} alt="Player Home"/>
          </div>
        </div>
      </div>
    </>
  );
}
