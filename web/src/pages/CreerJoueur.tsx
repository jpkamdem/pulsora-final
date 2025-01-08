import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TeamInterface } from "./Equipe";
import VideoLoading from "../components/VideoLoading";

export type Position = "GK" | "DEF" | "MF" | "FW" | undefined;

export type Player = {
  firstname: string;
  lastname: string;
  number: number;
  position: Position;
  teamId: number | undefined;
};

export default function CreerJoueur() {
  const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [player, setPlayer] = useState<Player>({
    firstname: "",
    lastname: "",
    number: 0,
    position: undefined,
    teamId: undefined,
  });

  const isEmpty =
    player.firstname.trim() === "" ||
    player.lastname.trim() === "" ||
    player.teamId === undefined ||
    player.position === undefined;

  async function fetchTeamsData() {
    await fetch("http://localhost:3000/teams", {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((datas) => setTeamsData(datas.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchTeamsData();
  }, []);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPlayer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleChangeSelect(e: ChangeEvent<HTMLSelectElement>) {
    setPlayer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const options: { value: Position; label: string }[] = [
    { value: "GK", label: "Gardien" },
    { value: "DEF", label: "Défenseur" },
    { value: "MF", label: "Milieu" },
    { value: "FW", label: "Attaquant" },
  ];

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: player.firstname,
          lastname: player.lastname,
          number: Number(player.number),
          position: player.position,
          teamId: Number(player.teamId),
          status: "Opérationnel",
          incidents: [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur inconnue du serveur");
      }

      setMessage("Jouer créé.");
    } catch (err: any) {
      console.log(err);
      setMessage(err.message || "Erreur lors de la création d'un joueur");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={(e: FormEvent) => handleFormSubmit(e)}
        className="flex flex-col m-auto mt-6 items-center w-1/2 h-3/4 p-4 border-solid  border-2"
      >
        <ul className="w-3/5 h-full pt-4 pb-4 flex flex-col items-center">
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Prénom</p>
              <input
                className="border-4 w-full"
                type="text"
                autoComplete="off"
                name="firstname"
                onChange={handleChange}
              />
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Nom</p>
              <input
                className="border-4 w-full"
                type="text"
                autoComplete="off"
                name="lastname"
                onChange={handleChange}
              />
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Numéro</p>
              <input
                className="border-4 w-full"
                type="number"
                autoComplete="off"
                name="number"
                onChange={handleChange}
              />
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Poste</p>
              <select
                defaultValue={undefined}
                onChange={handleChangeSelect}
                name="position"
              >
                <option value="">{undefined} </option>
                {options.map((option, index) => (
                  <>
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  </>
                ))}
              </select>
            </div>
          </li>
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p className="capitalize">équipe</p>
              <select onChange={handleChangeSelect} name="teamId">
                <option defaultValue={undefined} value="">
                  {undefined}
                </option>
                {teamsData.map((team, index) => (
                  <>
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  </>
                ))}
              </select>
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
