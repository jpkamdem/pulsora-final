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
import GererJoueur from "./pages/GererJoueur";
import GererArticle from "./pages/GererArticle";
import GererEquipe from "./pages/GererEquipe";
import CreerArticle from "./pages/CreerArticles";
import ModifierArticle from "./pages/ModifierArticle";
import SupprimerArticle from "./pages/SupprimerArticle";
import Profil from "./pages/Profil";
import CreerJoueur from "./pages/CreerJoueur";
import SupprimerJoueur from "./pages/SupprimerJoueur";
import ModifierJoueur from "./pages/ModifierJoueur";
import CreerEquipe from "./pages/CreerEquipe";
import ModifierEquipe from "./pages/ModifierEquipe";
import SupprimerEquipe from "./pages/SupprimerEquipe";
import Auth from "./pages/Auth";

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
        path: "authentification",
        element: <Auth />,
      },
      {
        path: "generer-match",
        element: <GenerateGame />,
      },
      {
        path: "profil",
        element: <Profil />,
        children: [
          {
            path: "articles",
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
            path: "joueurs",
            element: <GererJoueur />,
            children: [
              {
                path: "creer",
                element: <CreerJoueur />,
              },
              {
                path: "modifier",
                element: <ModifierJoueur />,
              },
              {
                path: "supprimer",
                element: <SupprimerJoueur />,
              },
            ],
          },
          {
            path: "equipes",
            element: <GererEquipe />,
            children: [
              {
                path: "creer",
                element: <CreerEquipe />,
              },
              {
                path: "modifier",
                element: <ModifierEquipe />,
              },
              {
                path: "supprimer",
                element: <SupprimerEquipe />,
              },
            ],
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
