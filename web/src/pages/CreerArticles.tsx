import { FormEvent, useState } from "react";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode";
import VideoLoading from "../components/VideoLoading";

export default function CreerArticle() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isEmpty = title.trim() === "" || body.trim() === "";

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.log("Il n'y a pas de token dans le local storage");
      return;
    }

    const decodedToken: TokenType = jwtDecode(storedToken);

    setIsLoading(true);
    fetch("http://localhost:3000/articles", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      body: JSON.stringify({
        title: title,
        body: body,
        authorId: decodedToken.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => setMessage("Article créé avec succès !"))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <form
        className="flex flex-col mx-auto mt-6 items-center w-full max-w-2xl p-8"
        onSubmit={handleForm}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Créer un nouvel article
        </h2>

        <ul className="w-full space-y-6">
          <li>
            <label htmlFor="title" className="block text-gray-700 font-semibold">
              Titre de l'article
            </label>
            <input
              id="title"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoComplete="off"
              placeholder="Entrez le titre de l'article"
            />
          </li>

          <li>
            <label htmlFor="body" className="block text-gray-700 font-semibold">
              Contenu de l'article
            </label>
            <textarea
              id="body"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder="Écrivez le contenu de votre article"
              rows={4}
            ></textarea>
          </li>
        </ul>

        <button
          type="submit"
          disabled={isEmpty}
          className={`mt-6 p-4 w-full rounded-md font-semibold text-white ${
            !isEmpty
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-300"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Création en cours..." : "Créer l'article"}
        </button>
      </form>

      {isLoading ? <VideoLoading /> : message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </>
  );
}
