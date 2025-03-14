import { Link } from "react-router-dom";
import VideoLoading from "./VideoLoading";

type Options = "articles" | "matchs" | "équipes";

type Props = {
  title: Options;
};

export default function Vide({ title }: Props) {
  function sentenceEnd(prop: Options) {
    if (prop === "articles") {
      return `Aucun article n'a encore été publié.`;
    }

    if (prop === "matchs") {
      return `Aucun match n'a encore été simulé.`;
    }

    return `Aucune équipe n'a encore été enregistrée`;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-1/4 h-[30dvh] m-auto mt-16">
        <p className="text-2xl">{sentenceEnd(title)}</p>
        {title === "matchs" ? (
          <>
            <Link to="/generer-match">
              <button className="bg-slate-800 p-6 text-white mt-12 hover:bg-white hover:text-slate-800">
                Générer un match
              </button>
            </Link>
          </>
        ) : (
          <>
            {/* <div className="bg-slate-800 p-6 text-white mt-6"></div> */}
            <VideoLoading />
          </>
        )}
      </div>
    </>
  );
}
