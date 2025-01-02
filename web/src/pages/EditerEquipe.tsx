import { useEffect, useState, FormEvent } from "react";
import { TeamInterface } from "./Equipe"; 
import { extractErrorMessage } from "../utils/security";

export default function EditerEquipe() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamInterface | null>(null); 
  const [updatedTeam, setUpdatedTeam] = useState<TeamInterface | null>(null); 
  
  async function fetchTeams() {
    try {
      const response = await fetch("http://localhost:3000/teams", {
        method: "GET",
        credentials: "same-origin",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setTeamsData(data.data); 
    } catch (error) {
      console.log(extractErrorMessage(error));
    }
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
        fetchTeams(); 
        console.log("Equipe supprimée");
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    } catch (err) {
      console.log(extractErrorMessage(err));
    }
  }

  async function editTeam(e: FormEvent, id: number) {
    e.preventDefault(); 

    if (!updatedTeam) {
      console.log("Pas de données à mettre à jour.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/teams/${id}`, {
        method: "PUT",
        credentials: "same-origin",
        mode: "cors",
        body: JSON.stringify(updatedTeam),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetchTeams(); 
        setSelectedTeam(null); 
        setUpdatedTeam(null); 
        console.log("Equipe mise à jour");
      } else {
        throw new Error("Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.log(extractErrorMessage(err));
    }
  }

  const handleEdit = (team: TeamInterface) => {
    setSelectedTeam(team);
    setUpdatedTeam({ ...team }); 
  };

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
              <button
                className="p-5 bg-yellow-400"
                onClick={() => handleEdit(team)} 
              >
                Modifier
              </button>
            </li>
          ))}
        </ul>
      </div>


      {selectedTeam && (
        <div className="flex justify-self-start mt-4">
          <form
            className="border-solid flex flex-col items-center m-auto border-2 p-4"
            onSubmit={(e) => editTeam(e, selectedTeam.id)}
          >
            <h3 className="font-bold">Modifier l'équipe</h3>
            <ul>
              <li>
                <label>Nom de l'équipe</label>
                <input
                  className="border-4 w-full"
                  name="name"
                  value={updatedTeam?.name || ""}
                  onChange={(e) =>
                    setUpdatedTeam((prev) => ({
                      ...prev!,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                />
              </li>
              <li>
                <label>Victoires</label>
                <input
                  className="border-4 w-full"
                  name="wins"
                  value={updatedTeam?.wins || 0}
                  onChange={(e) =>
                    setUpdatedTeam((prev) => ({
                      ...prev!,
                      wins: parseInt(e.target.value) || 0,
                    }))
                  }
                  type="number"
                />
              </li>
              <li>
                <label>Défaites</label>
                <input
                  className="border-4 w-full"
                  name="loses"
                  value={updatedTeam?.loses || 0}
                  onChange={(e) =>
                    setUpdatedTeam((prev) => ({
                      ...prev!,
                      loses: parseInt(e.target.value) || 0,
                    }))
                  }
                  type="number"
                />
              </li>
            </ul>
            <button type="submit" className="p-4 font-bold bg-green-500 text-white">
              Modifier l'équipe
            </button>
          </form>
        </div>
      )}
    </>
  );
}
