import { Link, Outlet } from "react-router-dom";

export default function Gerer() {
  return (
    <>
      <div>
        <ul>
          <Link to="/gerer/article">Gestion des articles</Link>
          <Link to="/gerer/equipe">Gestion des équipes</Link>
          <Link to="/gerer/joueur">Gestion des joueurs</Link>
          <Outlet />
        </ul>
      </div>
    </>
  );
}
