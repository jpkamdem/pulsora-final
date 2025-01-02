import { useEffect, useState } from "react";
import { TeamInterface } from "./Equipe";
import { extractErrorMessage } from "../utils/security";

export interface GameGeneratorInterface {
  homeTeamId: number;
  awayTeamId: number;
}

export default function GenerateGame() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  const [message, setMessage] = useState("");

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
      .then(() => setMessage("Equipe créée"))
      .catch((error) => setMessage(extractErrorMessage(error)));
  }, []);

  const generateGame = async () => {
    if (teamsData.length <= 1) {
      setMessage("Il n'y a pas assez d'équipes pour simuler une rencontre");
      return;
    }

    const teamsIdx = teamsData.map((team) => team.id);

    let homeTeamId = teamsIdx[Math.random() * teamsIdx.length];
    let awayTeamId: number;
    do {
      awayTeamId = teamsIdx[Math.random() * teamsIdx.length];
    } while (homeTeamId === awayTeamId);

    try {
      fetch("http://localhost:3000/games", {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        body: JSON.stringify({ homeTeamId, awayTeamId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => setMessage("Match généré !"))
        .catch((error) => setMessage(extractErrorMessage(error)));
    } catch (e) {
      setMessage("Erreur lors de la générationdu match");
    }
  };

  return (
    <>
      <div className="flex h-36 justify-center items-center">
        <button
          className="bg-slate-800 text-2xl text-white p-8 hover:text-slate-800 hover:bg-white"
          onClick={() => generateGame()}
        >
          Générer un match
        </button>
      </div>
      {message && <p>{message}</p>}
    </>
  );
}
