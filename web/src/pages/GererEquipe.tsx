import { FormEvent, useEffect, useState } from "react";
import { PlayerInterface, TeamInterface } from "./Equipe";
import axios from "axios";

export default function GererEquipe() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  const [teamName, setTeamName] = useState("");

  const [message, setMessage] = useState("");
  const isEmpty = teamName.trim() === "";
  const isTooShort = teamName.trim().length < 3;

  useEffect(() => {
    const fetchTeamsDatas = async () => {
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

    fetchTeamsDatas();
  }, []);

  const handleCreateForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (teamsData.find((item) => item.name === teamName)) {
        setMessage("Nom d'équipe déja utilisé");
        return;
      }
      axios.post("http://localhost:3000/teams", { name: teamName });
      setMessage("Equipe créée avec succès");
    } catch (e) {
      setMessage("Erreur lors de la création de l'équipe");
    }
  };

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
    } catch {}
  };

  return (
    <>
      <h3>Créer une équipe</h3>
      <form onSubmit={handleCreateForm}>
        <p>
          Nom de l'équipe :{" "}
          <input
            className="border-4"
            type="text"
            onChange={(e) => setTeamName(e.target.value)}
            value={teamName}
          />
        </p>
      </form>
      <button
        type="submit"
        disabled={isEmpty}
        className={`${
          isEmpty || isTooShort ? "cursor-not-allowed" : "hover:bg-red-400"
        }`}
      >
        Créer l'équipe
      </button>
      {message && <p>{message}</p>}
      <h3>Modifier une équipe</h3>
      <form onSubmit={handleUpdateForm} className="h-64 overflow-scroll">
        <ul>Liste des équipes</ul>
        {teamsData.map((team: TeamInterface) => (
          <li key={team.id}>
            <p className="text-xl font-bold">Nom : {team.name} </p>
            <p>ID : {team.id} </p>
            <p>
              Victoires :{" "}
              <span className="text-green-500 font-bold">{team.wins}</span>{" "}
            </p>
            <p>
              Défaites :{" "}
              <span className="text-red-500 font-bold">{team.loses}</span>{" "}
            </p>
            <ul>
              <p className="text-lg underline">Liste des joueurs</p>
              {team.players.map((player: PlayerInterface) => (
                <li key={player.id}>
                  <p>
                    Nom : {player.firstname} {player.lastname}
                  </p>
                  <p>
                    Numéro : <span className="font-bold">{player.number}</span>
                  </p>
                  <p>
                    Poste : <span className="font-bold">{player.position}</span>
                  </p>
                  <p className="capitalize">état de forme : {player.status}</p>
                  <ul>
                    {Array.isArray(player.incidents) &&
                    player.incidents.length >= 0 ? (
                      <p>Historique des incidents</p>
                    ) : null}
                    {Array.isArray(player.incidents) &&
                    player.incidents.length > 0
                      ? player.incidents.map(
                          (incident: { id: number; type: string }) => (
                            <li key={incident.id}>
                              <p>Type : {incident.type}</p>
                            </li>
                          )
                        )
                      : null}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </form>
    </>
  );
}
