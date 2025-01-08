import { useEffect, useState, FormEvent } from "react";
import { PlayerInterface, TeamInterface } from "./Equipe";
import { extractErrorMessage } from "../utils/security";

export type Status = "Suspendu" | "Blessé" | "Opérationnel" | "Inconnu";

export default function EditerJoueur() {
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInterface | null>(
    null
  );
  const [updatedPlayer, setUpdatedPlayer] = useState<PlayerInterface | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:3000/teams", {
      method: "GET",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => setTeams(datas.data))
      .catch((error) => console.log(extractErrorMessage(error)));
  }, []);

  const deletePlayer = (id: number) => {
    fetch(`http://localhost:3000/players/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        fetchTeams();
      })
      .catch((error) => console.log(extractErrorMessage(error)));
  };

  const fetchTeams = () => {
    fetch("http://localhost:3000/teams", {
      method: "GET",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => setTeams(datas.data))
      .catch((error) => console.log(extractErrorMessage(error)));
  };

  const handlePlayerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (updatedPlayer) {
      const { name, value } = e.target;

      setUpdatedPlayer((prev) => ({
        ...prev!,
        [name]: name === "number" ? Number(value) : value,
      }));
    }
  };

  const handlePlayerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (updatedPlayer) {
      fetch(`http://localhost:3000/players/${updatedPlayer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedPlayer),
      })
        .then(() => {
          fetchTeams();
          setUpdatedPlayer(null);
        })
        .catch((error) => console.log(extractErrorMessage(error)));
    }
  };

  const options: { value: Status; label: Status }[] = [
    { value: "Blessé", label: "Blessé" },
    { value: "Inconnu", label: "Inconnu" },
    { value: "Opérationnel", label: "Opérationnel" },
    { value: "Suspendu", label: "Suspendu" },
  ];

  return (
    <>
    <div className="flex justify-between p-8">

    
      <div className="flex flex-col">
        <h2 className="font-bold text-lg">Liste des joueurs</h2>
        <ul className="overflow-y-scroll h-96">
          {teams.map((team) => (
            <div key={team.id}>
              <h3 className="font-bold">{team.name}</h3>
              {team.players.map((player: PlayerInterface) => (
                <li key={player.id} className="bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm p-4 m-2">
                  <h4>
                    <span className="font-bold">Nom :</span> {player.lastname}
                  </h4>
                  <p>
                    <span className="font-bold">Prénom :</span>{" "}
                    {player.firstname}
                  </p>
                  <p>
                    <span className="font-bold">Numéro :</span> {player.number}
                  </p>
                  <p>
                    <span className="font-bold">Équipe :</span> {team.name}
                  </p>
                  <p>
                    <span className="font-bold">Forme :</span> {player.status}
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
              ))}
            </div>
          ))}
        </ul>
      </div>

      {updatedPlayer && (
        <div className="flex justify-self-start  p-6 ">
          <form onSubmit={handlePlayerSubmit} className="border-solid flex flex-col items-center m-auto border-2 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800  text-center mb-6">Modifier le joueur</h3>

            <div>
              <label className="block text-gray-700 font-semibold" htmlFor="lastname">Nom:</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={updatedPlayer.lastname}
                onChange={handlePlayerChange}
                className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2">
              <label className="block text-gray-700 font-semibold" htmlFor="firstname">Prénom:</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={updatedPlayer.firstname}
                onChange={handlePlayerChange}
                className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2">
              <label className="block text-gray-700 font-semibold" htmlFor="number">Numéro:</label>
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
              <label className="block text-gray-700 font-semibold" htmlFor="status">Forme:</label>
              <select
                id="status"
                name="status"
                value={updatedPlayer.status}
                onChange={handlePlayerChange}
                className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {options.map((option) => (
                  <>
                    <option value={option.value}> {option.label}</option>
                  </>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-bold mt-8">
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
