import axios from "axios";
import { useEffect, useState } from "react";
import { TeamInterface } from "./Equipe";

export interface GameGeneratorInterface {
  homeTeamId: number;
  awayTeamId: number;
}

export default function GenerateGame() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);

  useEffect(() => {
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

    fetchTeamsData();
  }, []);

  const [message, setMessage] = useState("");

  const generateGame = async () => {
    const url = "http://localhost:3000/games";

    let homeTeamId = Math.floor(Math.random() * teamsData.length + 1);
    let awayTeamId: number;
    do {
      awayTeamId = Math.floor(Math.random() * teamsData.length + 1);
    } while (homeTeamId === awayTeamId);

    try {
      await axios.post(url, { homeTeamId, awayTeamId });
      setMessage("Match généré avec succès");
    } catch (e) {
      setMessage("Erreur lors de la générationdu match");
    }
  };

  return (
    <>
      <button onClick={() => generateGame()}>Générer un match</button>
      {message && <p>{message}</p>}
    </>
  );
}
