// import { useState } from "react";
// import { TeamInterface } from "./Equipe";

export type Position = "GK" | "DEF" | "MF" | "ATK";

export type Player = {
  firstname: string;
  lastname: string;
  number: number;
  position: Position;
  teamId: number | undefined;
};

export default function CreerJoueur() {
  // const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  // const [player, setPlayer] = useState<Player>({
  //   firstname: "",
  //   lastname: "",
  //   number: 0,
  //   position: "ATK",
  //   teamId: undefined,
  // });

  // const isEmpty = false;

  // const fetchTeamsData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/teams");
  //     if (!res.ok) {
  //       throw new Error(
  //         `Erreur dans la récupération des données des matchs : ${res.status}`
  //       );
  //     }

  //     const datas = await res.json();
  //     setTeamsData(datas.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // fetchTeamsData();
  return (
    <>
      <form className="flex flex-col m-auto mt-6 items-center w-1/2 h-3/4 p-4 border-solid  border-2">
        <ul className="w-3/5 h-full pt-4 pb-4 flex flex-col items-center">
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Prénom</p>
              <input
                className="border-4 w-full"
                type="text"
                autoComplete="off"
                name="firstname"
              />
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Nom</p>
              <input
                className="border-4 w-full"
                type="text"
                autoComplete="off"
                name="lastname"
              />
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Numéro</p>
              <input
                className="border-4 w-full"
                type="number"
                autoComplete="off"
                name="number"
              />
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Poste</p>
              <input
                className="border-4 w-full"
                type="text"
                autoComplete="off"
                name="position"
              />
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p className="capitalize">équipe</p>
              <input
                className="border-4 w-full"
                type="text"
                autoComplete="off"
                name="team"
              />
            </div>
          </li>
        </ul>
        <button
          type="submit"
          className={`p-4 font-bold`}
          // disabled={isEmpty}
        >
          Créer
        </button>
      </form>
    </>
  );
}
