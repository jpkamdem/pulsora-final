import { useState } from "react";
import { TeamInterface } from "./Equipe";
import axios from "axios";

export default function EditerEquipe() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
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
  async function deleteTeam(id: number) {
    try {
      await axios.delete(`http://localhost:3000/teams/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  fetchTeamsData();
  return (
    <>
      <div>
        <h2 className="font-bold text-lg">Liste des équipes</h2>
        <ul className="overflow-y-scroll h-64">
          {teamsData.map((team) => (
            <li key={team.id} className="p-4">
              <h3>
                <span className="font-bold">Nom de l'équipe :</span> {team.name}
              </h3>
              <p>
                <span className="font-bold">Victoires :</span> {team.wins}
              </p>
              <p>
                <span className="font-bold">Défaites :</span> {team.loses}
              </p>
              <button
                className="p-5 bg-red-500"
                onClick={() => deleteTeam(team.id)}
              >
                Supprimer
              </button>
              <button className="p-5 bg-yellow-400">Modifier</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
