import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/security";

export type TokenType = {
  id: number;
  username: string;
  iat: number;
  exp: number;
};

export const SECRET_KEY = "firstnameBunchOfNumbers4894616";

export type UserType = {
  username: string;
  password: string;
  role: "USER" | "ADMIN";
  articles: { title: string; body: string; authorId: number }[];
};

export default function Auth() {
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const [userDatas, setUserDatas] = useState<UserType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [whichForm, setWhichForm] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    formType: "login" | "register"
  ) {
    if (formType === "register") {
      setUserRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      return;
    }
    setUserLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    return;
  }

  const isUserRegisterEmpty =
    userRegister.password.trim() === "" || userRegister.username.trim() === "";
  const isUserLoginEmpty =
    userLogin.password.trim() === "" || userLogin.username.trim() === "";

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:3000/users", {
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
      .then((datas) => setUserDatas(datas.data))
      .catch((error) => setMessage(extractErrorMessage(error)));

    return () => controller.abort();
  }, [userDatas]);

  async function handleRegisterSumbit(e: FormEvent) {
    e.preventDefault();
    if (isUserRegisterEmpty) {
      setMessage("Veuillez remplir tous les champs de création d'utilisateur");
      return;
    }

    setIsLoading(true);
    try {
      fetch("http://localhost:3000/connection/register", {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        body: JSON.stringify(userRegister),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => setMessage("Utilisateur créé."))
        .catch((error) => extractErrorMessage(error))
        .finally(() => setIsLoading(false));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    if (isUserLoginEmpty) {
      setMessage("Veuillez remplir tous les champs de connexion");
      return;
    }
    if (
      !userDatas?.some((user) => user.username === userLogin.username.trim())
    ) {
      setMessage(`L'utilisateur ${userLogin.username} n'existe pas`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/connection/login",
        userLogin,
        {
          withCredentials: true,
        }
      );

      const token: string = res.data.token;
      localStorage.setItem("token", token);

      setMessage("Utilisateur vérifié");
      setIsLoading(false);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Erreur inconnue");
      setIsLoading(false);
    }
  }

  return (
    <>
      <section>
        <h2 className="text-center p-4 mt-4 flex justify-center">
          <div>
            <p
              className="p-4 text-white bg-slate-800 hover:cursor-pointer hover:bg-white hover:text-slate-800"
              onClick={() => setWhichForm(true)}
            >
              S'inscrire
            </p>
            <p
              className="p-4 text-white bg-slate-800 hover:cursor-pointer hover:bg-white hover:text-slate-800"
              onClick={() => setWhichForm(false)}
            >
              Se connecter
            </p>
          </div>
        </h2>
        {whichForm ? (
          <form
            onSubmit={handleRegisterSumbit}
            className="flex flex-col m-auto mt-6 items-center w-1/2 h-3/4 p-4 border-solid  border-2"
          >
            <ul className="w-3/5 h-full pt-4 pb-4 flex flex-col items-center">
              <li className="w-full flex justify-center">
                <div className="p-4 w-full">
                  <p>Nom d'utilisateur</p>
                  <input
                    className="border-4 w-full"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleChange(e, "register")}
                    name="username"
                    value={userRegister.username}
                  />
                </div>
              </li>
              <li className="w-full h-full flex justify-center">
                <div className="items-center p-4 w-full h-1/3">
                  <p>Mot de passe</p>
                  <input
                    className="border-4 w-full"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => handleChange(e, "register")}
                    name="password"
                    value={userRegister.password}
                  />
                </div>
              </li>
            </ul>
            <button
              type="submit"
              className={`p-4 font-bold 
          }`}
            >
              Valider la création d'un utilisateur
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col m-auto mt-6 items-center w-1/2 h-3/4 p-4 border-solid  border-2"
          >
            <ul className="w-3/5 pt-4 pb-4 items-center">
              <li className="w-full flex justify-center">
                <div className="p-4 w-full">
                  <p>Nom d'utilisateur</p>
                  <input
                    className="border-4 w-full"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleChange(e, "login")}
                    name="username"
                    value={userLogin.username}
                  />
                </div>
              </li>
              <li className="w-full h-full flex justify-center">
                <div className="items-center p-4 w-full h-1/3">
                  <p>Mot de passe</p>
                  <input
                    className="border-4 w-full"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => handleChange(e, "login")}
                    name="password"
                    value={userLogin.password}
                  />
                </div>
              </li>
            </ul>
            <button
              type="submit"
              className={`p-4 font-bold 
          }`}
            >
              Valider la connexion
            </button>
          </form>
        )}
      </section>
      {isLoading ? <p>Chargement...</p> : <p>{message}</p>}
    </>
  );
}
