import { FormEvent, useState } from "react";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode";

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
        className="flex flex-col m-auto mt-6 items-center w-1/2 h-3/4 p-4 border-solid  border-2"
        onSubmit={handleForm}
      >
        <ul className="w-3/5 h-full pt-4 pb-4 flex flex-col items-center">
          <li className="w-full flex justify-center">
            <div className="p-4 w-full">
              <p>Titre de l'article</p>
              <input
                className="border-4 w-full"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                autoComplete="off"
              />
            </div>
          </li>
          <li className="w-full h-full flex justify-center">
            <div className="items-center p-4 w-full h-1/3">
              <p>Contenu de l'article</p>
              <textarea
                className="border-4 resize-none w-full h-full"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </div>
          </li>
        </ul>
        <button
          type="submit"
          disabled={isEmpty}
          className={`p-4 font-bold ${
            !isEmpty
              ? "hover:bg-slate-800 hover:text-white cursor-pointer"
              : "cursor-not-allowed"
          }`}
        >
          Créer
        </button>
      </form>
      {isLoading ? <p>Chargement...</p> : <p>{message}</p>}
    </>
  );
}
