import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { extractErrorMessage } from "../utils/security";
// import { jwtDecode } from "jwt-decode";

type Token = {
  email: string;
  username: string;
  role: string;
};

export default function Profil() {
  const [decodedToken, setDecodedToken] = useState<Token>({
    email: "",
    username: "",
    role: "",
  });
  const [showButtons, setShowButtons] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lsValues = [
      "email",
      "expiresAt",
      "role",
      "token",
      "type",
      "username",
      "id",
    ];
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setDecodedToken({ email: "", role: "USER", username: "" });
      return;
    }

    try {
      const token_expiresAt = Number(localStorage.getItem("expiresAt"));
      if (!token_expiresAt) {
        setError("Erreur interne");
      }

      const currentTime = Math.floor(Date.now() / 1000);

      if (Math.floor(token_expiresAt / 1000) < currentTime) {
        lsValues.forEach((_, index) =>
          localStorage.removeItem(lsValues[index])
        );
        navigate("/home");
        setMessage("Token expiré");
      }

      const username = localStorage.getItem("username");
      if (!username) {
        setError("Erreur interne");
        return;
      }
      setDecodedToken((prev) => ({ ...prev, username: username }));

      const email = localStorage.getItem("email");
      if (!email) {
        setError("Erreur interne");
        return;
      }
      setDecodedToken((prev) => ({ ...prev, email: email }));

      const role = localStorage.getItem("role");
      if (!role) {
        setError("Erreur interne");
        return;
      }
      setDecodedToken((prev) => ({ ...prev, role: role }));
    } catch (error: unknown) {
      lsValues.forEach((_, index) => localStorage.removeItem(lsValues[index]));
      setDecodedToken({ email: "", role: "USER", username: "" });
      setError(`Erreur interne: ${extractErrorMessage(error)}`);
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname !== "/profil") {
      setShowButtons(false);
    } else {
      setShowButtons(true);
    }
  }, [location]);

  const handleLogout = () => {
    const lsValues = [
      "email",
      "expiresAt",
      "role",
      "token",
      "type",
      "username",
      "id",
    ];

    lsValues.forEach((_, index) => localStorage.removeItem(lsValues[index]));
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate("/authentification");
    return { message: "Déconnexion réussie" };
  };

  const handleLoginRedirect = () => {
    navigate("/authentification");
  };

  return (
    <div className="p-8 bg-slate-100  ">
      {decodedToken.email !== "" ? (
        <>
          <div className="text-3xl text-center text-blue-800">MON COMPTE</div>
          <div>
            <ul>
              <li>
                <p>Nom d'utilisateur : {decodedToken.username}</p>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            >
              Se déconnecter
            </button>
          </div>

          {showButtons && (
            <div className="flex justify-center ">
              <ul className="">
                <Link to="/profil/articles">
                  <li className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 mb-1 rounded-lg w-full">
                    Gestion des articles
                  </li>
                </Link>

                <Link to="/profil/equipes">
                  <li className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 my-2 rounded-lg w-full">
                    Gestion des équipes
                  </li>
                </Link>

                <Link to="/profil/joueurs">
                  <li className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 mt-1 rounded-lg w-full">
                    Gestion des joueurs
                  </li>
                </Link>
              </ul>
            </div>
          )}

          <Outlet />
        </>
      ) : (
        <>
          <p className="text-red-600 font-bold text-center mt-8">
            Vous n'êtes pas connecté.
          </p>

          <div className="text-center mt-6">
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 mb-20"
            >
              Se connecter
            </button>
          </div>
        </>
      )}
      {error ? <p>{error}</p> : null}
      {message ? <p>{message}</p> : null}
    </div>
  );
}
