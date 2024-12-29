import { useEffect, useState } from "react";
import { PlayerInterface, TeamInterface } from "./Equipe";
import { extractErrorMessage } from "../utils/security";

export default function EditerJoueur() {
  const [teams, setTeams] = useState<TeamInterface[]>([]);

  useEffect(() => {
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
      .then((datas) => setTeams(datas.data))
      .catch((error) => console.log(extractErrorMessage(error)));
  }, []);

  async function deletePlayer(id: number) {
    fetch(`http://localhost:3000/players/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        fetch("http://localhost:3000/teams")
          .then((res) => res.json())
          .then((datas) => setTeams(datas.data))
          .catch((error) => console.log(extractErrorMessage(error)));
      })
      .catch((error) => extractErrorMessage(error));
  }

  return (
    <>
      <div>
        <h2 className="font-bold text-lg">Liste des joueurs</h2>
        <ul className="overflow-y-scroll h-64">
          {teams.map((team) => (
            <>
              {team.players.map((player: PlayerInterface) => (
                <li key={player.id} className="p-4">
                  <h3>
                    <span className="font-bold">Nom :</span> {player.lastname}
                  </h3>
                  <p>
                    <span className="font-bold">Prénom :</span>{" "}
                    {player.firstname}
                  </p>
                  <p>
                    <span className="font-bold">Numéro :</span> {player.number}
                  </p>
                  <p>
                    <span className="font-bold capitalize">équipe : </span>
                    {team.id === player.teamId ? team.name : ""}
                  </p>
                  <p>
                    <span className="font-bold">Forme : </span>
                    {player.status}
                  </p>
                  {player.incidents && player.incidents.length > 0 ? (
                    <p>
                      {" "}
                      <span className="font-bold">
                        Historique d'incident :
                      </span>{" "}
                      <ul>
                        {player.incidents.map((incident) => (
                          <li key={incident.id}>
                            <p>
                              <span>Type d'incident : </span>
                              {incident.type}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    className="p-5 bg-red-500"
                    onClick={() => deletePlayer(player.id)}
                  >
                    Supprimer
                  </button>
                  <button className="p-5 bg-yellow-400">Modifier</button>
                </li>
              ))}
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
