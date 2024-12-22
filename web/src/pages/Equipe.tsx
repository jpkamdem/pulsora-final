import { useEffect, useState } from "react";

type Position = "GK" | "DEF" | "MF" | "FW";
type Status = "Suspendu" | "Blessé" | "Opérationnel" | "Inconnu";

export interface TeamInterface {
  id: number;
  name: string;
  wins: number;
  loses: number;
  players: [];
  homeGames: [];
  awayGames: [];
}

export interface PlayerInterface {
  id: number;
  firstname: string;
  lastname: string;
  number: number;
  position: Position;
  status: Status;
  teamId: number;
  incidents: { id: number; type: string }[];
}

export default function Equipe() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);

  useEffect(() => {
    const fetchTeamsDatas = async () => {
      try {
        const res = await fetch("http://localhost:3000/teams");
        if (!res.ok) {
          throw new Error(
            `Erreur dans la récupération des données des matchs : ${res.status}`
          );
        }

        const datas = await res.json();
        setTeamsData(datas.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchTeamsDatas();
  }, []);
  return (
    <>
      {teamsData.map((team: TeamInterface) => (
        <>
          <>
            <div className="mt-8">
              <div className="">
                <div className="flex justify-center ">
                  <div className=" text-center relative  bg-white border-2 border-gray-100 rounded-t-xl  w-3/6 py-3  ">
                    <div className="absolute  left-10 bg-green-400 px-2  py-0.5  rounded-md">
                      • {team.name}
                    </div>
                    <div className="text-gray-400 font-medium ">
                      Victoires : {team.wins} - Défaites : {team.loses}
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly">
                  <div className="flex w-3/6 border-gray-100 border-l-2 border-r-2 border-b-2 rounded-b-xl drop-shadow-sm ">
                    <div className="w-1/3  p-6">
                      <div className="flex items-center justify-center ">
                        <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center  border-2 border-gray-300">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center  drop-shadow-lg">
                            <div className="w-14 h-14 bg-black rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <ul className="text-xl font-bold mb-2 mt-2">
                          Liste des joueurs
                        </ul>
                        {team.players.map((player: PlayerInterface) => (
                          <>
                            <li key={player.id} className="list-none">
                              <p>
                                {player.number} - {player.firstname}{" "}
                                {player.lastname} - {player.position}
                              </p>
                              <p></p>
                            </li>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      ))}
    </>
  );
}
