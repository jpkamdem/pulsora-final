import { FormEvent, useState } from "react";
import { useGetUserWithPosts } from "../utils/hooks";
import SmallLoading from "../components/SmallLoading";

export type Article = {
  id: number;
  authorId: number;
  title: string;
  body: string;
};

const userId = Number(localStorage.getItem("id"));
if (!userId) {
  console.log("Erreur interne");
}

export default function EditerArticle() {
  const {
    userWithPosts,
    loading: usersLoading,
    refetch,
  } = useGetUserWithPosts(userId);
  const storedToken = localStorage.getItem("token");
  const [updatedArticle, setUpdatedArticle] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [inputField, setInputField] = useState({
    articleId: 0,
    showUpdateField: false,
  });

  if (!storedToken) {
    console.log("Il n'y a pas de token dans le local storage");
    return;
  }

  async function deleteArticle(id: number) {
    fetch(`http://localhost:3333/api/posts/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => refetch())
      .catch((error) => console.log(error));
  }

  async function editArticle(e: FormEvent, id: number) {
    e.preventDefault();

    if (id === null) {
      throw new Error("ID invalide, aucun article n'a été sélectionné");
    }

    fetch(`http://localhost:3333/api/posts/${id}`, {
      method: "PATCH",
      credentials: "same-origin",
      mode: "cors",
      body: JSON.stringify(updatedArticle),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => refetch())
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="flex justify-between p-8">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg text-center">
            Liste de vos articles
          </h2>
          <ul>
            {usersLoading ? (
              <SmallLoading value="utilisateurs" />
            ) : (
              userWithPosts &&
              userWithPosts.map((user, index) => (
                <div key={index}>
                  {user.user_id === userId ? (
                    <li
                      className="bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm p-4 m-2"
                      key={index}
                    >
                      <p>
                        <span className="font-bold">Titre :</span> {user.title}
                      </p>
                      <p>
                        <span className="font-bold">Contenu :</span>{" "}
                        {user.content}
                      </p>
                      <button
                        onClick={() => deleteArticle(user.post_id)}
                        className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                      >
                        Supprimer
                      </button>
                      <button
                        className="p-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-200 ml-4"
                        onClick={() => {
                          setInputField((prev) => ({
                            ...prev,
                            articleId: user.post_id,
                            showUpdateField: !inputField.showUpdateField,
                          }));
                        }}
                      >
                        Modifier
                      </button>
                    </li>
                  ) : null}
                </div>
              ))
            )}
          </ul>
        </div>
        {inputField.showUpdateField ? (
          <div className="flex justify-end w-1/2 p-6 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md">
            <form
              className="flex flex-col space-y-6"
              onSubmit={(e) => editArticle(e, inputField.articleId)}
            >
              <h4 className="text-xl font-bold text-gray-800  text-center">
                {" "}
                Modifier l'article
              </h4>
              <ul>
                <li>
                  <label className="block text-gray-700 font-semibold">
                    Titre
                  </label>
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
                  <label className="block text-gray-700 font-semibold">
                    Contenu
                  </label>
                  <textarea
                    name="content"
                    onChange={(e) =>
                      setUpdatedArticle((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Modifiez le contenu de votre article"
                  ></textarea>
                </li>
              </ul>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-bold"
              >
                Modifier
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}
