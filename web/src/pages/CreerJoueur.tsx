import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TeamInterface } from "./Equipe";
import VideoLoading from "../components/VideoLoading";

export type Position = "GK" | "DEF" | "MF" | "FW" | undefined;

export type Player = {
  firstname: string;
  lastname: string;
  number: number;
  position: Position;
  teamId: number | undefined;
};

export default function CreerJoueur() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [player, setPlayer] = useState<Player>({
    firstname: "",
    lastname: "",
    number: 0,
    position: undefined,
    teamId: undefined,
  });

  const isEmpty =
    player.firstname.trim() === "" ||
    player.lastname.trim() === "" ||
    player.teamId === undefined ||
    player.position === undefined;

  async function fetchTeamsData() {
    await fetch("http://localhost:3000/teams", {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((datas) => setTeamsData(datas.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchTeamsData();
  }, []);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPlayer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleChangeSelect(e: ChangeEvent<HTMLSelectElement>) {
    setPlayer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const options: { value: Position; label: string }[] = [
    { value: "GK", label: "Gardien" },
    { value: "DEF", label: "Défenseur" },
    { value: "MF", label: "Milieu" },
    { value: "FW", label: "Attaquant" },
  ];

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: player.firstname,
          lastname: player.lastname,
          number: Number(player.number),
          position: player.position,
          teamId: Number(player.teamId),
          status: "Opérationnel",
          incidents: [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur inconnue du serveur");
      }

      setMessage("Joueur créé.");
    } catch (err: any) {
      console.log(err);
      setMessage(err.message || "Erreur lors de la création d'un joueur");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={(e: FormEvent) => handleFormSubmit(e)}
        className="flex flex-col mx-auto mt-6 items-center w-full max-w-2xl p-8 "
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Créer un joueur
        </h2>

        <ul className="w-full space-y-6">
          <li>
            <label htmlFor="firstname" className="block text-gray-700 font-semibold">
              Prénom
            </label>
            <input
              id="firstname"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="firstname"
              autoComplete="off"
              onChange={handleChange}
              value={player.firstname}
              placeholder="Entrez le prénom du joueur"
            />
          </li>

          <li>
            <label htmlFor="lastname" className="block text-gray-700 font-semibold">
              Nom
            </label>
            <input
              id="lastname"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="lastname"
              autoComplete="off"
              onChange={handleChange}
              value={player.lastname}
              placeholder="Entrez le nom du joueur"
            />
          </li>

          <li>
            <label htmlFor="number" className="block text-gray-700 font-semibold">
              Numéro
            </label>
            <input
              id="number"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="number"
              onChange={handleChange}
              value={player.number}
              placeholder="Entrez le numéro du joueur"
            />
          </li>

          <li>
            <label htmlFor="position" className="block text-gray-700 font-semibold">
              Poste
            </label>
            <select
              id="position"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="position"
              value={player.position}
              onChange={handleChangeSelect}
            >
              <option value="">Sélectionner un poste</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </li>

          <li>
            <label htmlFor="teamId" className="block text-gray-700 font-semibold">
              Équipe
            </label>
            <select
              id="teamId"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="teamId"
              value={player.teamId}
              onChange={handleChangeSelect}
            >
              <option value="">Sélectionner une équipe</option>
              {teamsData.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </li>
        </ul>

        <button
          type="submit"
          className={`mt-6 p-4 w-full rounded-md font-semibold text-white ${
            !isEmpty
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-300"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={isEmpty}
        >
          {isLoading ? "Création en cours..." : "Créer le joueur"}
        </button>
      </form>

      {isLoading ? <VideoLoading /> : message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </>
  );
}
