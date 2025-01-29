import { ChangeEvent, FormEvent, useState } from "react";
import VideoLoading from "../components/VideoLoading";
import { extractErrorMessage } from "../utils/security";
import { useGetTeams } from "../utils/hooks";
import SmallLoading from "../components/SmallLoading";

export default function CreerJoueur() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    number: 0,
    position: undefined,
    teamId: undefined,
  });

  const { teams, loading: teamLoading } = useGetTeams();

  const isEmpty =
    player.firstName.trim() === "" ||
    player.lastName.trim() === "" ||
    player.teamId === undefined ||
    player.position === undefined ||
    player.number === 0;

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPlayer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleChangeSelect(e: ChangeEvent<HTMLSelectElement>) {
    setPlayer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const options = [
    { value: "gk", label: "Gardien" },
    { value: "def", label: "Défenseur" },
    { value: "mf", label: "Milieu" },
    { value: "fw", label: "Attaquant" },
  ];

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3333/api/players", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: player.firstName,
          lastName: player.lastName,
          number: Number(player.number),
          position: player.position,
          teamId: Number(player.teamId),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur inconnue du serveur");
      }

      setMessage("Joueur créé.");
      setPlayer({
        firstName: "",
        lastName: "",
        number: 0,
        position: undefined,
        teamId: undefined,
      });
    } catch (error) {
      setMessage(
        extractErrorMessage(error) || "Erreur lors de la création d'un joueur"
      );
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
            <label
              htmlFor="firstname"
              className="block text-gray-700 font-semibold"
            >
              Prénom
            </label>
            <input
              id="firstname"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="firstName"
              autoComplete="off"
              onChange={handleChange}
              value={player.firstName}
              placeholder="Entrez le prénom du joueur"
            />
          </li>

          <li>
            <label
              htmlFor="lastname"
              className="block text-gray-700 font-semibold"
            >
              Nom
            </label>
            <input
              id="lastName"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="lastName"
              autoComplete="off"
              onChange={handleChange}
              value={player.lastName}
              placeholder="Entrez le nom du joueur"
            />
          </li>

          <li>
            <label
              htmlFor="number"
              className="block text-gray-700 font-semibold"
            >
              Numéro
            </label>
            <input
              id="number"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="number"
              onChange={handleChange}
              value={player?.number}
              placeholder="Entrez le numéro du joueur"
            />
          </li>

          <li>
            <label
              htmlFor="position"
              className="block text-gray-700 font-semibold"
            >
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
            <label
              htmlFor="teamId"
              className="block text-gray-700 font-semibold"
            >
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
              {teamLoading ? (
                <SmallLoading value="équipes" />
              ) : (
                teams &&
                teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))
              )}
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

      {isLoading ? (
        <VideoLoading />
      ) : (
        message && <p className="text-center mt-4 text-green-500">{message}</p>
      )}
    </>
  );
}
