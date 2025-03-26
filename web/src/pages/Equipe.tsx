import React from "react";
import Vide from "../components/Vide";
import { useGetPlayers, useGetTeams } from "../utils/hooks";
import { pos } from "../utils/types";
import SmallLoading from "../components/SmallLoading";

export default function Equipe() {
  const { teams, loading: teamLoading } = useGetTeams();
  const { players, loading: playerLoading } = useGetPlayers();

  return (
    <>
      {teamLoading ? (
        <SmallLoading value="équipes" />
      ) : (
        <>
          {teams && teams.length > 0 ? (
            <>
              {teams.map((team) => (
                <React.Fragment key={team.id}>
                  <>
                    <div className="mt-8 flex justify-center ">
                      <div className=" text-center relative bg-white border-2 border-gray-100 rounded-t-xl w-3/6 py-3">
                        <div className="absolute  left-10 bg-green-400 px-2  py-0.5  rounded-md">
                          <p>•{team.name}</p>
                        </div>
                        <div className="text-gray-400 font-medium ">
                          Victoires : {team.wins} - Défaites : {team.loses} -{" "}
                          <span className="capitalize">égalité : </span>{" "}
                          {team.draws}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-evenly">
                      <div className="flex flex-col items-center w-3/6 border-gray-100 border-l-2 border-r-2 border-b-2 rounded-b-xl drop-shadow-sm ">
                        <div className="w-1/3  p-6">
                          <div className="flex items-center justify-center ">
                            <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center  border-2 border-gray-300">
                              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center drop-shadow-lg">
                                <div className="w-14 h-14 bg-black rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <ul className="text-xl font-bold mb-2 mt-2">
                              Liste des joueurs
                            </ul>
                            {playerLoading ? (
                              <SmallLoading value="joueurs" />
                            ) : (
                              <>
                                {players &&
                                  players.map((player, index) => (
                                    <React.Fragment key={index}>
                                      {player.teamId === team.id ? (
                                        <li className="list-none">
                                          <p>
                                            <span className="font-bold">
                                              {player.number}
                                            </span>{" "}
                                            -{" "}
                                            <span className="capitalize">
                                              {player.firstName}
                                            </span>{" "}
                                            <span className="capitalize">
                                              {player.lastName}
                                            </span>{" "}
                                            -{" "}
                                            <span className="underline">
                                              {pos(player.position)}
                                            </span>{" "}
                                            <br />{" "}
                                            <span className="capitalize">
                                              état :
                                            </span>{" "}
                                            {player.status}
                                          </p>
                                        </li>
                                      ) : null}
                                    </React.Fragment>
                                  ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </React.Fragment>
              ))}
            </>
          ) : (
            <Vide title="équipes" />
          )}
        </>
      )}
    </>
  );
}
