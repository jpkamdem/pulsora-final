import { Link } from "react-router-dom";
import {
  Player,
  Team,
  useGetGames,
  useGetPlayers,
  useGetTeams,
} from "../utils/hooks";
import { pos } from "../utils/types";
import React from "react";

export default function Saison() {
  const { games, loading: gameLoading } = useGetGames();
  const { teams, loading: teamLoading } = useGetTeams();
  const { players, loading: playerLoading } = useGetPlayers();

  return (
    <>
      {gameLoading ? (
        <p>Chargement des matchs...</p>
      ) : (
        <>
          {games && games.length > 0 ? (
            <>
              {games.map((game) => (
                <React.Fragment key={game.id}>
                  <div className="flex justify-center my-8">
                    <div className="text-center relative bg-white border-2 border-gray-100 rounded-t-xl w-3/6 py-3">
                      <div className="absolute left-10 bg-green-400 px-2  py-0.5 rounded-md">
                        • Terminé
                      </div>
                      <div className="text-gray-400 font-medium">
                        Match amical -{" "}
                        {new Intl.DateTimeFormat("fr-FR", {
                          dateStyle: "long",
                          timeStyle: "short",
                        }).format(new Date(game.createdAt))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex justify-between w-3/6 border-gray-100 border-x-2 border-b-2 rounded-b-xl drop-shadow-sm">
                      {/*  */}
                      <TeamComponent
                        color="bg-red-300"
                        id={game.homeTeamId}
                        players={players}
                        playerLoading={playerLoading}
                        teams={teams}
                        teamLoading={teamLoading}
                      />
                      <p>
                        <span
                          className={`${
                            game.homeScore > game.awayScore
                              ? "text-green-600"
                              : "text-red-600"
                          } font-bold`}
                        >
                          {game.homeScore}
                        </span>{" "}
                        -{" "}
                        <span
                          className={`${
                            game.awayScore > game.homeScore
                              ? "text-green-600"
                              : "text-red-600"
                          } font-bold`}
                        >
                          {game.awayScore}
                        </span>
                      </p>
                      <TeamComponent
                        color="bg-blue-300"
                        id={game.awayTeamId}
                        players={players}
                        playerLoading={playerLoading}
                        teams={teams}
                        teamLoading={teamLoading}
                        key={game.id}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <div>
                <Link to="/generer-match">Gérérer un match</Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

function Orb({ color }: { color: string }) {
  return (
    <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-300">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center drop-shadow-lg">
        <div className={`w-14 h-14 ${color} rounded-full`}></div>
      </div>
    </div>
  );
}

type TeamProps = {
  teams: Team[] | null;
  teamLoading: boolean;
  players: Player[] | null;
  playerLoading: boolean;
  id: number;
  color: string;
};

function TeamComponent({
  teams,
  teamLoading,
  players,
  playerLoading,
  id,
  color,
}: TeamProps) {
  return (
    <div className="w-1/3 p-6">
      <div className="flex items-center justify-center">
        <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-300">
          <Orb color={color} />
        </div>
      </div>
      <div className="text-center">
        <div className="my-4">
          {teamLoading ? (
            <p>Chargement des équipes...</p>
          ) : (
            <>
              {teams &&
                teams.map((team, index) => (
                  <React.Fragment key={index}>
                    {team.id === id ? (
                      <span className="capitalize font-bold">{team.name}</span>
                    ) : null}
                  </React.Fragment>
                ))}
            </>
          )}
        </div>
        <div className="my-4">
          {playerLoading ? (
            <p>Chargement des joueurs...</p>
          ) : (
            <>
              {players &&
                players.map((player, index) => (
                  <React.Fragment key={index}>
                    {player.teamId === id ? (
                      <p>
                        {" "}
                        <span className="capitalize">
                          {player.number} - {player.firstName} {player.lastName}{" "}
                          -{" "}
                        </span>
                        {pos(player.position)}
                      </p>
                    ) : null}
                  </React.Fragment>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
