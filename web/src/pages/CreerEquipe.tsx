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
        className="flex flex-col m-auto mt-6 items-center w-1/2 h-3/4 p-4 border-solid  border-2"
      >
        <ul className="w-3/5 h-full pt-4 pb-4 flex flex-col items-center">
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Nom de l'équipe</p>
              <input
                className="border-4 w-full"
                type="text"
                autoComplete="off"
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </li>
        </ul>
        <button type="submit" className={`p-4 font-bold`} disabled={isEmpty}>
          Créer
        </button>
      </form>
      {isLoading ? <VideoLoading /> : <p>{message}</p>}
    </>
  );
}
