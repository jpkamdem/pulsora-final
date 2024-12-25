import { Link, Outlet } from "react-router-dom";

export default function GererEquipe() {
  // const [teamsData, setTeamsData] = useState<TeamInterface[]>([]);
  // const [teamName, setTeamName] = useState("");

  // const [message, setMessage] = useState("");
  // const isEmpty = teamName.trim() === "";
  // const isTooShort = teamName.trim().length < 3;

  // useEffect(() => {
  //   const fetchTeamsDatas = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/teams");
  //       if (!res.ok) {
  //         throw new Error(
  //           `Erreur dans la récupération des données des matchs : ${res.status}`
  //         );
  //       }

  //       const datas = await res.json();
  //       setTeamsData(datas.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchTeamsDatas();
  // }, []);

  // const handleCreateForm = async (e: FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     if (teamsData.find((item) => item.name === teamName)) {
  //       setMessage("Nom d'équipe déja utilisé");
  //       return;
  //     }
  //     axios.post("http://localhost:3000/teams", { name: teamName });
  //     setMessage("Equipe créée avec succès");
  //   } catch (e) {
  //     setMessage("Erreur lors de la création de l'équipe");
  //   }
  // };

  // const handleUpdateForm = async (e: FormEvent) => {
  //   e.preventDefault();
  //   try {
  //   } catch {}
  // };

  return (
    <>
      <h2 className="text-center pb-4 text-2xl">Gestion des équipes</h2>
      <section className="flex justify-around">
        <Link to="/profil/equipes/creer">
          <div className="p-6 bg-slate-800 text-white text-lg font-bold hover:bg-white hover:text-slate-800">
            <p>Créer</p>
          </div>
        </Link>
        <Link to="/profil/equipes/modifier">
          <div className="p-6 bg-slate-800 text-white text-lg font-bold hover:bg-white hover:text-slate-800">
            <p>Modifier</p>
          </div>
        </Link>
        <Link to="/profil/equipes/supprimer">
          <div className="p-6 bg-slate-800 text-white text-lg font-bold hover:bg-white hover:text-slate-800">
            <p>Supprimer</p>
          </div>
        </Link>
      </section>
      <Outlet />
    </>
  );
}
