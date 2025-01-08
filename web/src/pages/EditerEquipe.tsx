import { useEffect, useState, FormEvent } from "react";
import { TeamInterface } from "./Equipe"; // Assurez-vous que l'interface TeamInterface est bien définie
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
    <div className="flex justify-between p-8">

    
      <div className="flex flex-col">


        <h2 className="font-bold text-lg text-center mt-10">Liste des équipes</h2>
        <ul className="">
          {teamsData.map((team) => (
            <li key={team.id} className="bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm p-4 m-2">
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
                className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                onClick={() => deleteTeam(team.id)}
              >
                Supprimer
              </button>
              <button
                className="p-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-200 ml-4"
                onClick={() => handleEdit(team)} 
              >
                Modifier
              </button>
            </li>
          ))}
        </ul>
      </div>


      {selectedTeam && (
        <div className="flex justify-self-start  p-6 ">
          <form
            className="border-solid flex flex-col items-center m-auto border-2 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md"
            onSubmit={(e) => editTeam(e, selectedTeam.id)}
          >
            <h3 className="text-xl font-bold text-gray-800  text-center">Modifier l'équipe</h3>
            <ul>
              <li>
                <label className="block text-gray-700 font-semibold">Nom de l'équipe</label>
                <input
                  className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-gray-700 font-semibold">Victoires</label>
                <input
                  className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label  className="block text-gray-700 font-semibold">Défaites</label>
                <input
                  className="w-full px-4 py-1 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10"
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
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-bold">
              Modifier l'équipe
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
}
