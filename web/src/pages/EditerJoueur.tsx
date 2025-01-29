import React, { useState, FormEvent } from "react";
import { extractErrorMessage } from "../utils/security";
import { Player, useGetPlayers, useGetTeams } from "../utils/hooks";
import SmallLoading from "../components/SmallLoading";

export type Status = "Suspendu" | "Blessé" | "Opérationnel" | "Inconnu";

export default function EditerJoueur() {
  const { teams, loading: teamLoading } = useGetTeams();
  const {
    players,
    loading: playerLoading,
    refetch: playerRefetch,
  } = useGetPlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [updatedPlayer, setUpdatedPlayer] = useState<Partial<Player> | null>(
    null
  );

  const deletePlayer = (id: number) => {
    fetch(`http://localhost:3333/api/players/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => playerRefetch())
      .catch((error) => {
        return { message: extractErrorMessage(error) };
      });
  };

  const handlePlayerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setUpdatedPlayer((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlayerSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(updatedPlayer);
    if (updatedPlayer) {
      fetch(`http://localhost:3333/api/players/${updatedPlayer.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlayer),
      })
        .then(() => {
          playerRefetch();
          setUpdatedPlayer(null);
        })
        .catch((error) => {
          return { message: extractErrorMessage(error) };
        });
    }
  };

  const options = [
    { value: "blessé", label: "Blessé" },
    { value: "inconnu", label: "Inconnu" },
    { value: "opérationnel", label: "Opérationnel" },
    { value: "suspendu", label: "Suspendu" },
  ];

  return (
    <>
      <div className="flex justify-between p-8">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Liste des joueurs</h2>
          <ul className="overflow-y-scroll h-96">
            {teamLoading ? (
              <SmallLoading value="équipes" />
            ) : (
              teams &&
              teams.map((team) => (
                <div key={team.id}>
                  <h3 className="font-bold">{team.name}</h3>
                  {playerLoading ? (
                    <SmallLoading value="joueurs" />
                  ) : (
                    players &&
                    players.map((player: Player) =>
                      player.teamId === team.id ? (
                        <li
                          key={player.id}
                          className="bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm p-4 m-2"
                        >
                          <h4>
                            <span className="font-bold">Nom :</span>{" "}
                            {player.lastName}
                          </h4>
                          <p>
                            <span className="font-bold">Prénom :</span>{" "}
                            {player.firstName}
                          </p>
                          <p>
                            <span className="font-bold">Numéro :</span>{" "}
                            {player.number}
                          </p>
                          <p>
                            <span className="font-bold">Équipe :</span>{" "}
                            {team.name}
                          </p>
                          <p>
                            <span className="font-bold">Forme :</span>{" "}
                            {player.status}
                          </p>

                          <button
                            className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                            onClick={() => deletePlayer(player.id)}
                          >
                            Supprimer
                          </button>
                          <button
                            className="p-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-200 ml-4"
                            onClick={() => {
                              setSelectedPlayer(player);
                              setUpdatedPlayer({ ...player });
                            }}
                          >
                            Modifier
                          </button>
                        </li>
                      ) : null
                    )
                  )}
                </div>
              ))
            )}
          </ul>
        </div>

        {updatedPlayer && (
          <div className="flex justify-self-start  p-6 ">
            <form
              onSubmit={handlePlayerSubmit}
              className="border-solid flex flex-col items-center m-auto border-2 p-4 bg-gray-100  border-gray-300 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800  text-center mb-6">
                Modifier le joueur
              </h3>

              <div>
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="lastName"
                >
                  Nom:
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={updatedPlayer.lastName}
                  onChange={handlePlayerChange}
                  className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="firstName"
                >
                  Prénom:
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={updatedPlayer.firstName}
                  onChange={handlePlayerChange}
                  className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="number"
                >
                  Numéro:
                </label>
                <input
                  id="number"
                  name="number"
                  type="number"
                  value={updatedPlayer.number}
                  onChange={handlePlayerChange}
                  className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="status"
                >
                  Forme:
                </label>
                <select
                  id="status"
                  name="status"
                  value={updatedPlayer.status}
                  onChange={handlePlayerChange}
                  className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {options.map((option, index) => (
                    <React.Fragment key={index}>
                      <option value={option.value}>{option.label}</option>
                    </React.Fragment>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-bold mt-8"
              >
                Sauvegarder
              </button>
            </form>
          </div>
        )}
        {selectedPlayer ? null : null}
      </div>
    </>
  );
}
