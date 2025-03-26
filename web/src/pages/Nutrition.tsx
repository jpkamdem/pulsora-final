import { FaUtensils, FaAppleAlt, FaTint, FaClock, FaWeight } from "react-icons/fa";
import boisson from "../assets/boisson.png";
import cereales from "../assets/cereales.png";
import chocolat from "../assets/chocolat.png";
import vitamines from "../assets/vitamines.png";
import eau from "../assets/eau.png";
import calendrier from "../assets/calendrier.png";
import balance from "../assets/balance.png";

export default function Nutrition() {
  return (
    <div className="bg-gray-50 font-sans">
      <section className="text-center py-8 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Conseils Nutrition</h1>
        <p className="mt-2 text-lg text-gray-600">Optimise ton alimentation pour une meilleure performance !</p>
      </section>

      <div className="flex flex-col items-center justify-center py-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4">
          <section className="bg-blue-100 text-blue-600 flex flex-col items-center justify-center rounded-lg p-6 shadow-md">
            <FaUtensils size={40}  />
            <h2 className="text-lg font-semibold">Que manger avant un match ?</h2>
            <p className="text-center text-gray-700 mt-2">
              Consomme un repas riche en glucides complexes (pâtes, riz complet, patates douces) accompagné de protéines maigres
              et de légumes. Une banane ou une barre énergétique avant le match peut être utile !
            </p>
          </section>
          <section className="bg-blue-100 text-blue-600 flex flex-col items-center justify-center rounded-lg p-6 shadow-md">
            <FaAppleAlt size={40} />
            <h2 className="text-lg font-semibold">Que manger après un match ?</h2>
            <p className="text-center text-gray-700 mt-2">
              Priorité à la récupération musculaire ! Un repas riche en protéines (œufs, poisson, viande blanche, légumineuses) et
              en glucides (quinoa, riz, patates douces) avec des légumes est recommandé.
            </p>
          </section>
        </div>
      </div>

      <section className="text-center py-8 bg-white shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Nos Produits Nutritionnels</h2>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {[ 
          { img: boisson, name: "PULSOJUICE", desc: "Boisson énergisante enrichie en caféine naturelle, vitamines B et antioxydants.", price: "9,99€" },
          { img: cereales, name: "BARRE PROTORA", desc: "Barre protéinée avec 20g de protéines pour une meilleure récupération.", price: "19,99€" },
          { img: chocolat, name: "CHOCORA", desc: "Tablette de chocolat enrichie en superaliments et antioxydants.", price: "4,50€" },
          { img: vitamines, name: "PULVITA", desc: "Complexe vitaminé pour soutenir l'énergie et la récupération.", price: "29,99€" }
        ].map((item, index) => (
          <div key={index} className="bg-blue-100 rounded-lg p-6 flex items-center gap-6 shadow-md">
            <img src={item.img} alt={item.name} className="w-32 h-32 rounded-lg" />
            <div>
              <h3 className="text-lg font-semibold text-blue-600">{item.name}</h3>
              <p className="text-gray-700 mt-2">{item.desc}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-blue-500">{item.price}</span>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Acheter</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="text-center py-8 bg-white shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Autres Conseils Nutrition</h2>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {[ 
          { icon: <FaTint size={40} />, title: "Hydratation essentielle", img: eau, desc: "Boire 1,5 à 2L d'eau par jour est essentiel pour éviter la déshydratation et maintenir la performance." },
          { icon: <FaClock size={40} />, title: "4 repas par jour", img: calendrier, desc: "Une alimentation équilibrée se répartit en 4 repas structurés pour un bon apport énergétique." },
          { icon: <FaWeight size={40} />, title: "Poids de forme", img: balance, desc: "Suivre son poids et sa masse grasse permet d'optimiser ses performances sur le long terme." }
        ].map((item, index) => (
          <div key={index} className="bg-blue-100 rounded-lg p-6 flex flex-col items-center shadow-md">
            {item.icon}
            <h3 className="text-lg font-semibold text-blue-600 mt-4">{item.title}</h3>
            <img src={item.img} alt={item.title} className="w-24 h-24 rounded-lg mt-4" />
            <p className="text-center text-gray-700 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}