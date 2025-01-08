import { FormEvent, useEffect, useState } from "react";
import { TeamInterface } from "./Equipe";
import { extractErrorMessage } from "../utils/security";
import VideoLoading from "../components/VideoLoading";

export default function CreerEquipe() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = teamName.trim() === "";

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:3000/teams", {
      signal: controller.signal,
      method: "GET",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => setTeamsData(datas.data))
      .catch((err) => extractErrorMessage(err));

    return () => controller.abort();
  }, [teamsData]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isEmpty) {
      setMessage("Remplis le champ de texte");
      return;
    }

    if (
      teamsData.some(
        (team) =>
          team.name.toLocaleLowerCase().trim() ===
          teamName.toLocaleLowerCase().trim()
      )
    ) {
      setMessage("Ce nom d'équipe est déjà pris");
      return;
    }

    setIsLoading(true);

    fetch("http://localhost:3000/teams", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      body: JSON.stringify({ name: teamName }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => setMessage("Equipe créée"))
      .catch((error) => extractErrorMessage(error))
      .catch(() => setMessage("Erreur lors de la création d'une équipe"))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto mt-6 items-center w-full max-w-2xl p-8 "
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Créer une équipe
        </h2>

        <ul className="w-full space-y-6">
          <li>
            <label htmlFor="teamName" className="block text-gray-700 font-semibold">
              Nom de l'équipe
            </label>
            <input
              id="teamName"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              autoComplete="off"
              onChange={(e) => setTeamName(e.target.value)}
              value={teamName}
              placeholder="Entrez le nom de l'équipe"
            />
          </li>
        </ul>

        <button
          type="submit"
          disabled={isEmpty}
          className={`mt-6 p-4 w-full rounded-md font-semibold text-white ${
            !isEmpty
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-300"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Création en cours..." : "Créer l'équipe"}
        </button>
      </form>

      {isLoading ? <VideoLoading /> : message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </>
  );
}
