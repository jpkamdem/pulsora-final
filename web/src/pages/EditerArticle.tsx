import { FormEvent, useEffect, useState } from "react";
import { TokenType } from "./Auth";
import { jwtDecode } from "jwt-decode";
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
    fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).catch((error) => console.log(error));
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

    fetch(`http://localhost:3000/articles/${id}`, {
      method: "PUT",
      credentials: "same-origin",
      mode: "cors",
      body: JSON.stringify(updatedArticle),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).catch((error) => console.log(error));
  }

  return (
    <>
      <div className="flex justify-between p-8">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg text-center">Liste de vos articles</h2>
          <ul className="">
            {usersDatas.map((user, index) => (
              <div key={index}>
                {user.articles.map((article, indexx) => (
                  <>
                    {article.authorId === decodedToken.id ? (
                      <li className="bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm p-4 m-2" key={indexx}>
            
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
                          className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                        >
                          Supprimer
                        </button>
                        <button
                          className="p-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-200 ml-4"
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
          <div className="flex justify-end w-1/2 p-6 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md">
            <form
              className="flex flex-col space-y-6"
              onSubmit={(e) => editArticle(e, inputField.articleId)}>
              <h4 className="text-xl font-bold text-gray-800  text-center"> Modifier l'article</h4>
              <ul>
                <li>
                  <label className="block text-gray-700 font-semibold" >Titre</label>
                  <input
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="title"
                    placeholder="Modifiez le titre de l'article"
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
                  <label className="block text-gray-700 font-semibold" >Contenu</label>
                  <textarea
                    name="body"
                    onChange={(e) =>
                      setUpdatedArticle((prev) => ({
                        ...prev,
                        body: e.target.value,
                      }))
                    }
                    className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Modifiez le contenu de votre article"

                  ></textarea>
                </li>
              </ul>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-bold">
                Modifier
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}
