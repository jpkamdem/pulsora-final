import { useEffect, useState } from "react";
import { TeamInterface } from "./Equipe";
import { extractErrorMessage } from "../utils/security";

export default function EditerEquipe() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);

  async function fetchTeams() {
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
      .then((datas) => setTeamsData(datas.data))
      .catch((error) => console.log(extractErrorMessage(error)));
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  async function deleteTeam(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/teams/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetch("http://localhost:3000/teams")
          .then((res) => res.json())
          .then((datas) => setTeamsData(datas.data));
        console.log("Equipe supprimée");
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    } catch (err) {
      console.log(extractErrorMessage(err));
    }
  }

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
