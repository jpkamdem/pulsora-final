import { useState } from "react";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export type Role = "ADMIN" | "USER";

export type Article = {
  id: number;
  authorId: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  role: Role;
  articles: Article[];
};

export default function SupprimerArticle() {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    console.log("Il n'y a pas de token dans le local storage");
    return;
  }
  const decodedToken: TokenType = jwtDecode(storedToken);

  const [usersDatas, setUsersDatas] = useState<User[]>([]);

  async function fetchUsersDatas() {
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const datas = await res.json();
      setUsersDatas(datas.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteArticle(id: number) {
    try {
      await axios.delete(`http://localhost:3000/articles/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  fetchUsersDatas();
  return (
    <div>
      <h2 className="font-bold text-lg">Liste de vos articles</h2>
      <ul>
        {usersDatas.map((user) => (
          <>
            {user.articles.map((article, indexx) => (
              <>
                {article.authorId === decodedToken.id ? (
                  <li className="p-4" key={indexx}>
                    <p>
                      <span className="font-bold">ID :</span> {article.id}
                    </p>
                    <p>
                      <span className="font-bold">Titre :</span> {article.title}
                    </p>
                    <p>
                      <span className="font-bold">Contenu :</span>{" "}
                      {article.body}
                    </p>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="p-5 bg-red-400"
                    >
                      Supprimer
                    </button>
                  </li>
                ) : null}
              </>
            ))}
          </>
        ))}
      </ul>
    </div>
  );
}
