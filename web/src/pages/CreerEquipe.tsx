import { FormEvent, useState } from "react";
import { useGetTeams } from "../utils/hooks";
import { extractErrorMessage } from "../utils/security";
import VideoLoading from "../components/VideoLoading";
import SmallLoading from "../components/SmallLoading";

export default function CreerEquipe() {
  const { teams, loading: teamLoading } = useGetTeams();
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");

  const isEmpty = teamName.trim() === "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isEmpty) {
      setMessage("Remplis le champ de texte");
      return;
    }

    if (
      teams &&
      teams.some(
        (team) =>
          team.name.toLocaleLowerCase().trim() ===
          teamName.toLocaleLowerCase().trim()
      )
    ) {
      setMessage("Ce nom d'équipe est déjà pris");
      return;
    }

    fetch("http://localhost:3333/api/teams", {
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
      .then(() => setTeamName(""))
      .catch((error) => extractErrorMessage(error))
      .catch(() => setMessage("Erreur lors de la création d'une équipe"));
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
            <label
              htmlFor="teamName"
              className="block text-gray-700 font-semibold"
            >
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
          {teamLoading ? <SmallLoading value="équipes" /> : "Créer l'équipe"}
        </button>
      </form>

      {teamLoading ? (
        <VideoLoading />
      ) : (
        message && <p className="text-center mt-4 text-green-500">{message}</p>
      )}
    </>
  );
}
