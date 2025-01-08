import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Vide from "../components/Vide";

type Role = "USER" | "ADMIN";

interface UserInterface {
  id: number;
  username: string;
  password: string;
  role: Role;
  articles: ArticleInterface[];
}

interface ArticleInterface {
  id: number;
  title: string;
  body: string;
  authorId: number;
}

export default function Articles() {
  const [usersDatas, setUsersDatas] = useState<UserInterface[] | null>(null);

  useEffect(() => {
    const fetchUsersDatas = async () => {
      try {
        const res = await fetch("http://localhost:3000/users");
        if (!res.ok) {
          throw new Error(
            `Erreur dans la récupération des données des matchs : ${res.status}`
          );
        }

        const datas = await res.json();
        setUsersDatas(datas.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsersDatas();
  }, []);
  return (
    <>
      {usersDatas &&
        usersDatas.map((user) => (
          <>
            {user.articles.length > 0 ? (
              user.articles.map((article) => (
                <>
                  <div className="flex justify-center mt-8 mb-8">
                    <div className=" text-center relative  bg-white border-2 border-gray-100 rounded-t-xl  w-3/6 py-3  ">
                      <div
                        key={user.id}
                        className="absolute  left-10 bg-green-400 px-2  py-0.5  rounded-md"
                      >
                        • {user.username}
                      </div>
                      <div className="text-gray-400 font-medium ">
                        {article.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center  ">
                    <div className="flex justify-between  w-3/6   border-gray-100 border-l-2 border-r-2 border-b-2 rounded-b-xl drop-shadow-sm p-4 pl-8">
                      {article.body}
                    </div>
                  </div>
                </>
              ))
            ) : (
              <Vide title="articles" />
            )}
          </>
        ))}
    </>
  );
  const navigate = useNavigate();

  const handleEnter = () => {
    setTimeout(() => {
      navigate("/nutrition");
    }, 0);
  };
  return (
    <button
      onClick={handleEnter}
      className="mt-8 px-6 py-3 text-white bg-blue-900 rounded-lg shadow hover:bg-blue-800 transition"
    >
      NUTRITION
    </button>
  );
}
