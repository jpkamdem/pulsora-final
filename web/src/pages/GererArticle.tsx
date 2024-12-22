import { FormEvent, useState } from "react";
import axios from "axios";

export default function GererArticle() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const isEmpty = title.trim() === "" || body.trim() === "";

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3000/articles", { title, body });
      setMessage("Article créé avec succès");
    } catch (e) {
      setMessage("Erreur lors de la création de l'article");
    }
  };
  return (
    <>
      <form onSubmit={handleForm}>
        <ul>
          <li>
            Titre de l'article :{" "}
            <input
              className="border-4"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoComplete="off"
            />
          </li>
          <li>
            Contenu :{" "}
            <textarea
              className="border-4"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </li>
        </ul>
        <button
          type="submit"
          disabled={!isEmpty}
          className={`${
            !isEmpty ? "hover:bg-red-400 cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          Créer
        </button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
