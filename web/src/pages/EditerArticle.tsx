import { FormEvent, useEffect, useState } from "react";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { extractErrorMessage } from "../utils/security";

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

export default function EditerArticle() {
  const storedToken = localStorage.getItem("token");
  const [updatedArticle, setUpdatedArticle] = useState<{
    title: string;
    body: string;
  }>({ title: "", body: "" });

  if (!storedToken) {
    console.log("Il n'y a pas de token dans le local storage");
    return;
  }
  const decodedToken: TokenType = jwtDecode(storedToken);
  const [usersDatas, setUsersDatas] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => setUsersDatas(datas.data))
      .catch((error) => console.log(extractErrorMessage(error)));
  });

  async function deleteArticle(id: number) {
    try {
      await axios.delete(`http://localhost:3000/articles/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [inputField, setInputField] = useState({
    articleId: 0,
    showUpdateField: false,
  });

  async function editArticle(e: FormEvent, id: number) {
    e.preventDefault();

    if (id === null) {
      throw new Error("ID invalide, aucun article n'a été sélectionné");
    }

    const res = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "PUT",
      credentials: "same-origin",
      mode: "cors",
      body: JSON.stringify(updatedArticle),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la modification de l'article");
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Liste de vos articles</h2>
          <ul className="overflow-y-scroll h-64">
            {usersDatas.map((user, index) => (
              <div key={index}>
                {user.articles.map((article, indexx) => (
                  <>
                    {article.authorId === decodedToken.id ? (
                      <li className="p-4" key={indexx}>
                        <p>
                          <span className="font-bold">ID :</span> {article.id}
                        </p>
                        <p>
                          <span className="font-bold">Titre :</span>{" "}
                          {article.title}
                        </p>
                        <p>
                          <span className="font-bold">Contenu :</span>{" "}
                          {article.body}
                        </p>
                        <button
                          onClick={() => deleteArticle(article.id)}
                          className="p-5 bg-red-500"
                        >
                          Supprimer
                        </button>
                        <button
                          className="p-5 bg-yellow-400"
                          onClick={() => {
                            setInputField((prev) => ({
                              ...prev,
                              articleId: article.id,
                              showUpdateField: !inputField.showUpdateField,
                            }));
                          }}
                        >
                          Modifier
                        </button>
                      </li>
                    ) : null}
                  </>
                ))}
              </div>
            ))}
          </ul>
        </div>
        {inputField.showUpdateField ? (
          <div className="flex justify-self-start">
            <form
              className="border-solid flex flex-col items-center m-auto border-2"
              onSubmit={(e) => editArticle(e, inputField.articleId)}
            >
              <ul>
                <li>
                  <label>Titre</label>
                  <input
                    className="border-4 w-full"
                    name="title"
                    onChange={(e) =>
                      setUpdatedArticle((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    type="text"
                  />
                </li>
                <li>
                  <label>Contenu</label>
                  <textarea
                    name="body"
                    onChange={(e) =>
                      setUpdatedArticle((prev) => ({
                        ...prev,
                        body: e.target.value,
                      }))
                    }
                    className="border-4 resize-none w-full h-full"
                  ></textarea>
                </li>
              </ul>
              <button type="submit" className="p-4 font-bold">
                Modifier
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}
