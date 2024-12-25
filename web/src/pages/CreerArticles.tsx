import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { TokenType, UserType } from "./Auth";

export default function CreerArticle() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [userDatas, setUserDatas] = useState<UserType[] | null>(null);

  async function fetchUsers() {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => setUserDatas(res));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const isEmpty = title.trim() === "" || body.trim() === "";

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setMessage("Veuillez vous authentifier");
      return;
    }
    const decodedToken: TokenType = JSON.parse(storedToken);
    setIsLoading(true);
    try {
      axios.post(
        "http://localhost:3000/articles",
        { title: title, body: body, authorId: decodedToken.id },
        { withCredentials: true }
      );

      setMessage("Article créé avec succès");
      setIsLoading(false);
      return;
    } catch (e) {
      setMessage("Erreur lors de la création de l'article");
      setIsLoading(false);
      return;
    }
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
