import { useEffect, useState } from "react";
import { PlayerInterface, TeamInterface } from "./Equipe";
import { Link } from "react-router-dom";

export interface GameInterface {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  date: Date;
}

export default function Saison() {
  const [gamesData, setGamesData] = useState<GameInterface[]>([]);
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const res = await fetch("http://localhost:3000/games");
        if (!res.ok) {
          throw new Error(
            `Erreur dans la récupération des données des matchs : ${res.status}`
          );
        }
        const datas = await res.json();
        setGamesData(datas.data);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchTeamsData = async () => {
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

    fetchTeamsData();
    fetchGamesData();
  }, []);

  return (
    <>
      <div className="mt-8">
        <div className="text-center text-2xl text-blue-900 mb-8">
          SAISON ACTUELLE
          <br />
          <Link to="/generer-match">
            <button>Générer un match</button>
          </Link>
        </div>

        {gamesData &&
          gamesData.map((game) => (
            <>
              <div>
                <div key={game.id} className="flex justify-center mt-8 mb-8">
                  <div className="text-center relative bg-white border-2 border-gray-100 rounded-t-xl  w-3/6 py-3">
                    <div className="absolute left-10 bg-green-400 px-2  py-0.5 rounded-md">
                      • Terminé
                    </div>
                    <div className="text-gray-400 font-medium ">
                      Match Amical -{" "}
                      {new Intl.DateTimeFormat("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      }).format(new Date(game.date))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex justify-between w-3/6 border-gray-100 border-l-2 border-r-2 border-b-2 rounded-b-xl drop-shadow-sm ">
                    <div className="w-1/3 p-6">
                      <div className="flex items-center justify-center ">
                        <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-300">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center drop-shadow-lg">
                            <div className="w-14 h-14 bg-black rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center  ">
                        <div className="my-4">
                          {teamsData.map((team) => (
                            <>
                              {team.id === game.homeTeamId ? (
                                <p key={team.id}>{team.name}</p>
                              ) : undefined}
                            </>
                          ))}
                        </div>
                        {teamsData.map((team) => (
                          <>
                            {team.players.map((player: PlayerInterface) => (
                              <>
                                {player.teamId === game.homeTeamId ? (
                                  <p key={player.id}>
                                    {player.firstname} {player.lastname} -{" "}
                                    {player.position}
                                  </p>
                                ) : undefined}
                              </>
                            ))}
                          </>
                        ))}
                      </div>
                    </div>
                    <div className="w-1/3  p-6 flex justify-center  space-x-8 my-10">
                      <div
                        className={`${
                          game.homeScore > game.awayScore
                            ? "text-green-500"
                            : "text-red-500"
                        } font-xl font-bold`}
                      >
                        {game.homeScore}
                      </div>
                      <div>:</div>
                      <div
                        className={`${
                          game.awayScore > game.homeScore
                            ? "text-green-500"
                            : "text-red-500"
                        } font-xl font-bold`}
                      >
                        {game.awayScore}
                      </div>
                    </div>
                    <div className="w-1/3 p-6">
                      <div className="flex items-center justify-center ">
                        <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-300">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center drop-shadow-lg">
                            <div className="w-14 h-14 bg-red-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="my-4">
                          {teamsData.map((team) => (
                            <>
                              {team.id === game.awayTeamId ? (
                                <p key={team.id}>{team.name}</p>
                              ) : undefined}
                            </>
                          ))}
                        </div>
                        {teamsData.map((team) => (
                          <>
                            {team.players.map((player: PlayerInterface) => (
                              <>
                                {player.teamId === game.awayTeamId ? (
                                  <p key={player.id}>
                                    {player.firstname} {player.lastname} -{" "}
                                    {player.position}
                                  </p>
                                ) : undefined}
                              </>
                            ))}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
