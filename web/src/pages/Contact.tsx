import teamImage from "../assets/social/equipebmf.jpg";

export default function Contact() {
  return (
    <>
      <div className="bg-gray-100 font-sans">
        <section className="text-center py-12 bg-white">
          <h1 className="text-4xl font-bold text-blue-600">CONTACT</h1>
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Qui sommes-nous ?
          </p>
          <p className="max-w-3xl mx-auto mt-4 text-gray-600">
            Voici un petit texte pour vous présenter : Bonjour à toutes et à
            tous, Nous sommes le groupe BMF, composé de 5 étudiants en 3ᵉ année
            du BUT MMI. Dans le cadre de notre projet, nous travaillons sur la
            création d’un site web dédié à la gestion d’une équipe de football.
            Notre objectif est de proposer une plateforme intuitive et
            performante qui facilite la gestion des joueurs, des matchs, et des
            statistiques pour les entraîneurs et les membres d’une équipe. Ce
            projet nous permet de mettre en pratique nos compétences en design,
            développement web, et gestion de projet. Nous sommes ravis de vous
            présenter notre travail et de partager notre avancée avec vous.
            Merci pour votre attention et votre intérêt !{" "}
          </p>
        </section>

        <section className="relative py-12">
          <div className="max-w-5xl mx-auto hidden lg:block">
            <img
              src={teamImage}
              alt="Photo d'équipe"
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      </div>
    </>
  );
}
