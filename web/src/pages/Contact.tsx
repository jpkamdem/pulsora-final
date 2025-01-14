// import facebookIcon from "../assets/social/facebook.png";
// import instagramIcon from "../assets/social/instagram.png";
// import linkedinIcon from "../assets/social/linkedin.png";
// import snapchatIcon from "../assets/social/snapchat.png";
// import twitterIcon from "../assets/social/twitter.png";
// import emailIcon from "../assets/social/email.png";
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

        {/* <section className="bg-gray-100 font-sans">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              <a href="www.facebook.com" className="flex flex-col items-center">
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  className="w-12 h-12 mb-2"
                />
                <span>bmf</span>
              </a>
              <a
                href="www.instagram.com"
                className="flex flex-col items-center"
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="w-12 h-12 mb-2"
                />
                <span>@bmf</span>
              </a>
              <a href="www.snapchat.com" className="flex flex-col items-center">
                <img
                  src={snapchatIcon}
                  alt="Snapchat"
                  className="w-12 h-12 mb-2"
                />
                <span>@bmf</span>
              </a>
              <a href="www.linkedin.fr" className="flex flex-col items-center">
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="w-12 h-12 mb-2"
                />
                <span>bmf</span>
              </a>
              <a href="www.x.com" className="flex flex-col items-center">
                <img
                  src={twitterIcon}
                  alt="Twitter"
                  className="w-12 h-12 mb-2"
                />
                <span>@bmf</span>
              </a>
              <a href="www.gmail.com" className="flex flex-col items-center">
                <img src={emailIcon} alt="Mail" className="w-12 h-12 mb-2" />
                <span>bmf@edu.univ-eiffeil.fr</span>
              </a>
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
}
