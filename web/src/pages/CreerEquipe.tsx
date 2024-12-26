import { FormEvent, useState } from "react";
import { TeamInterface } from "./Equipe";
import axios from "axios";

export default function CreerEquipe() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
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

  const isEmpty = teamName.trim() === "";

  fetchTeamsData();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isEmpty) {
      setMessage("Remplis le champ de texte");
      return;
    }

    if (teamsData.some((team) => team.name === teamName)) {
      setMessage("Ce nom d'équipe est déjà pris");
      return;
    }

    try {
      await axios.post("http://localhost:3000/teams", { name: teamName });
      setMessage("Equipe créée");
    } catch (error) {
      console.log(error);
    }
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
      {message && <p>{message}</p>}
    </>
  );
}
