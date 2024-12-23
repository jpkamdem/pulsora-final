import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Saison from "./pages/Saison";
import Equipe from "./pages/Equipe";
import Contact from "./pages/Contact";
import GenerateGame from "./pages/GenerateGame";
import Gerer from "./pages/Gerer";
import GererJoueur from "./pages/GererJoueur";
import GererArticle from "./pages/GererArticle";
import GererEquipe from "./pages/GererEquipe";
import CreerArticle from "./pages/CreerArticles";
import ModifierArticle from "./pages/ModifierArticle";
import SupprimerArticle from "./pages/SupprimerArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "saison",
        element: <Saison />,
      },
      {
        path: "equipe",
        element: <Equipe />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "generer-match",
        element: <GenerateGame />,
      },
      {
        path: "gerer/",
        element: <Gerer />,
        children: [
          {
            path: "article",
            element: <GererArticle />,
            children: [
              {
                path: "creer",
                element: <CreerArticle />,
              },
              {
                path: "modifier",
                element: <ModifierArticle />,
              },
              {
                path: "supprimer",
                element: <SupprimerArticle />,
              },
            ],
          },
          {
            path: "joueur",
            element: <GererJoueur />,
          },
          {
            path: "equipe",
            element: <GererEquipe />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
