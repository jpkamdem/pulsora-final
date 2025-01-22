import { useState } from "react";
import { extractErrorMessage } from "../utils/security";
import { ApiError, ApiResponse } from "../utils/types";

export default function GenerateGame() {
  const [message, setMessage] = useState("");

  async function generateGame() {
    try {
      const response = await fetch("http://localhost:3333/api/games", {
        method: "POST",
      });
      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        setMessage(errorData.message || "Erreur interne");
        return;
      }

      const data = (await response.json()) as ApiResponse;
      setMessage(data.message);
    } catch (error: unknown) {
      setMessage(extractErrorMessage(error));
    }
  }

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
