import boisson from "../assets/boisson.png";
// import cereales from "../assets/cereales.png";
// import chocolat from "../assets/chocolat.png";
// import vitamines from "../assets/vitamines.png";

export default function Nutrition() {
  return (
    <>
      <div className="bg-gray-100 font-sans">
        <section className="text-center py-6 bg-white">
          <p className="mt-4 text-xl text-gray-700 font-medium">
            Petits conseils nutrition
          </p>
        </section>
      </div>
      <div className="flex flex-col items-center justify-center py-6 bg-white">
        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
          <section className="h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4">
            <p className="text-center text-lg text-blue-500 font-medium">
              Que manger avant un match de foot ?
            </p>
          </section>
          <section className="h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4">
            <p className="text-center text-lg text-blue-500 font-medium">
              Que manger après un match de foot ?
            </p>
          </section>
        </div>
        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16 mt-4">
          <section className="bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4 overflow-y-auto">
            <p className="text-center text-lg text-blue-500 font-medium">
              Il est important de consommer un repas riche en glucides complexes
              pour fournir de l'énergie, comme des pâtes, du riz complet ou des
              patates douces, accompagnés d'une source de protéines maigres
              (poulet, poisson ou tofu) et de légumes. Ce repas doit être pris 3
              à 4 heures avant le match. En collation, une banane ou une barre
              énergétique peut être consommée une heure avant le début pour un
              apport rapide d'énergie.
            </p>
          </section>
          <section className="bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4 overflow-y-auto">
            <p className="text-center text-lg text-blue-500 font-medium">
              La priorité est de reconstituer les réserves d'énergie et de
              favoriser la récupération musculaire. Un repas riche en protéines
              (œufs, poisson, viande blanche ou légumineuses) et en glucides
              (quinoa, riz, patates douces) est idéal, accompagné de légumes
              pour les vitamines et minéraux. Une boisson comme un smoothie ou
              une eau riche en électrolytes peut aider à réhydrater
              efficacement.
            </p>
          </section>
        </div>
      </div>
      <div className="bg-gray-100 font-sans">
        <section className="text-center py-6 bg-white">
          <p className="mt-4 text-xl text-gray-700 font-medium">
            Achetez des articles dès maintenant !
          </p>
        </section>
      </div>
      <div className="bg-blue-100 font-sans flex items-center p-6 gap-6">
        <div className="w-1/3">
          <img
            src={boisson}
            alt="Boisson Energisante"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-2/3 pl-6">
          <p className="text-left text-lg text-blue-500 font-medium">
            PULSOJUICE
          </p>
          <p className="text-left text-lg text-gray-700 font-medium">
            La boisson énergisante qui booste tes performances et ton bien-être
            ! Grâce à sa formule enrichie en caféine naturelle, vitamines B, et
            antioxydants, Pulsora améliore ta concentration, réduit la fatigue
            et soutient ta vitalité. Avec ses saveurs rafraîchissantes et ses
            bienfaits, c’est le coup de pouce idéal pour performer au sport.
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-blue-500">9,99€</span>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition duration-300">
              Acheter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
