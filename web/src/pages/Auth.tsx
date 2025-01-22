import { ChangeEvent, FormEvent, useState } from "react";
import { extractErrorMessage } from "../utils/security";
import { ApiError, ApiResponse } from "../utils/types";

export type TokenType = {
  id: number;
  username: string;
  iat: number;
  exp: number;
};

type Token = {
  email: string;
  username: string;
  role: string;
  token: string;
};

function parseCookie(): Record<string, string> {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);
}

export default function Auth() {
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

  const registerEmpty =
    registerForm.email === "" ||
    registerForm.username === "" ||
    registerForm.password === "";

  const loginEmpty = loginForm.email === "" || loginForm.password === "";

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
      localStorage.setItem("token", cookie.token);
      localStorage.setItem("username", cookie.username);
      localStorage.setItem("email", cookie.email);
      localStorage.setItem("role", cookie.role);
    } catch (error: unknown) {
      setLoginMessage((prev) => ({
        ...prev,
        error: extractErrorMessage(error),
      }));
    }
  }

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
        <label>Adresse mail</label>
        <input
          type="email"
          name="email"
          onChange={(e) => handleRegisterChange(e)}
          value={registerForm.email}
        />
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          onChange={(e) => handleRegisterChange(e)}
          value={registerForm.username}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          onChange={(e) => handleRegisterChange(e)}
          value={registerForm.password}
        />
        <button
          type="submit"
          disabled={registerEmpty}
          className={registerEmpty ? `bg-red-500` : ""}
        >
          S'inscrire
        </button>
      </form>
      {registerMessage.message && <p>{registerMessage.message}</p>}
      {registerMessage.error && <p>{registerMessage.error}</p>}
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <label>Adresse mail</label>
        <input
          type="email"
          name="email"
          onChange={(e) => handleLoginChange(e)}
          value={loginForm.email}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          onChange={(e) => handleLoginChange(e)}
          value={loginForm.password}
        />
        <button
          type="submit"
          disabled={loginEmpty}
          className={loginEmpty ? `bg-red-500` : ""}
        >
          Se connecter
        </button>
        {loginMessage.message && <p>{loginMessage.message}</p>}
        {loginMessage.error && <p>{loginMessage.error}</p>}
      </form>
    </>
  );
}
