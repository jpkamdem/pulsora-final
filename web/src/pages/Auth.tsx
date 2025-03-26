import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../utils/security";
import { ApiError, ApiResponse } from "../utils/types";
import authstade from "../assets/authstade.webp"

type Token = {
  email: string;
  username: string;
  role: string;
  token: string;
  id: string;
};

export type Tokenn = {
  token: string;
  expiresAt: string;
  type: string;
  abilities: [];
};

function parseCookie(): Record<string, string> {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);
}

export default function Auth() {
  const [trigger, setTrigger] = useState(false);
  const [registerMessage, setRegisterMEssage] = useState({
    error: "",
    message: "",
  });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState({ error: "", message: "" });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const registerEmpty =
    registerForm.email === "" ||
    registerForm.username === "" ||
    registerForm.password === "";

  const loginEmpty = loginForm.email === "" || loginForm.password === "";

  function toggle() {
    setTrigger(!trigger);
    return;
  }

  function handleRegisterChange(e: ChangeEvent<HTMLInputElement>) {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleLoginChange(e: ChangeEvent<HTMLInputElement>) {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });
      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        setRegisterMEssage((prev) => ({
          ...prev,
          error: errorData.message || "Erreur interne",
        }));
        return;
      }

      const data = (await response.json()) as ApiResponse;
      setRegisterMEssage((prev) => ({ ...prev, message: data.message }));
      setRegisterForm({ email: "", password: "", username: "" });
      setTrigger(!trigger);
    } catch (error: unknown) {
      setRegisterMEssage((prev) => ({
        ...prev,
        error: extractErrorMessage(error),
      }));
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        setLoginMessage((prev) => ({
          ...prev,
          error: errorData.message || "Erreur interne",
        }));
        return;
      }

      const data = (await response.json()) as ApiResponse;
      setLoginMessage((prev) => ({ ...prev, message: data.message }));
      setLoginForm({ email: "", password: "" });
      const cookie = parseCookie() as Token;
      const email = await JSON.parse(atob(cookie.email));
      const username = await JSON.parse(atob(cookie.username));
      const id = await JSON.parse(atob(cookie.id));
      const tempToken = await JSON.parse(atob(cookie.token));
      let token;
      if (
        tempToken &&
        typeof tempToken === "object" &&
        "message" in tempToken
      ) {
        if (typeof tempToken.message === "object") {
          token = tempToken.message as Tokenn | null;
          if (token && typeof token === "object") {
            if ("token" in token && typeof token.token === "string") {
              localStorage.setItem("token", token.token);
            }
            if ("expiresAt" in token && typeof token.expiresAt === "string") {
              const current = new Date(token.expiresAt);
              const timestamp = current.getTime();
              localStorage.setItem("expiresAt", timestamp.toString());
            }
            if ("type" in token && typeof token.type === "string") {
              localStorage.setItem("type", token.type);
            }
          }
        }
      }
      const role = await JSON.parse(atob(cookie.role));
      const valueArr = [email, username, role, id];
      const nameArr = ["email", "username", "role", "id"];

      valueArr.forEach((item, index) => {
        if (item && typeof item === "object" && "message" in item) {
          if (typeof item.message === "string") {
            localStorage.setItem(nameArr[index], item.message);
          }
          if (typeof item.message === "number") {
            localStorage.setItem(nameArr[index], String(item.message));
          }
        }
      });
      navigate("/profil");
    } catch (error: unknown) {
      setLoginMessage((prev) => ({
        ...prev,
        error: extractErrorMessage(error),
      }));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Partie Image du stade */}
        <div className="w-full lg:w-1/2">
          <img src={authstade} alt="Stade" className="w-full h-64 object-cover lg:h-full" />
        </div>

        {/* Formulaire */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
          <div className={`w-full mx-auto ${trigger ? "" : "hidden"}`}>
            <h1 className="text-center text-2xl font-bold text-gray-700 mb-4">
              Connexion
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">Adresse mail</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleLoginChange}
                  value={loginForm.email}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleLoginChange}
                  value={loginForm.password}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loginEmpty}
                className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
              >
                Se connecter
              </button>
              {loginMessage.message && <p className="text-green-500 mt-2">{loginMessage.message}</p>}
              {loginMessage.error && <p className="text-red-500 mt-2">{loginMessage.error}</p>}
            </form>
          </div>

          <div className={`w-full mx-auto ${!trigger ? "" : "hidden"}`}>
            <h1 className="text-center text-2xl font-bold text-gray-700 mb-4">
              Inscription
            </h1>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">Adresse mail</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleRegisterChange}
                  value={registerForm.email}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600">Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleRegisterChange}
                  value={registerForm.username}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleRegisterChange}
                  value={registerForm.password}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={registerEmpty}
                className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
              >
                S'inscrire
              </button>
              {registerMessage.message && <p className="text-green-500 mt-2">{registerMessage.message}</p>}
              {registerMessage.error && <p className="text-red-500 mt-2">{registerMessage.error}</p>}
            </form>
          </div>

          <div className="mt-4 text-center">
            {/* Texte pour passer de Connexion à Inscription et inversement */}
            <div className="text-blue-600 cursor-pointer">
              {!trigger && (
                <p>Vous avez déjà un compte?{" "}
                  <span onClick={() => setTrigger(true)} className="underline">
                    Connectez-vous
                  </span>
                </p>
              )}
              {trigger && (
                <p>Vous n'avez pas encore de compte?{" "}
                  <span onClick={() => setTrigger(false)} className="underline">
                    Inscrivez-vous
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
