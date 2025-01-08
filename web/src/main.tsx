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
import Profil from "./pages/Profil";
import CreerJoueur from "./pages/CreerJoueur";
import CreerEquipe from "./pages/CreerEquipe";
import Auth from "./pages/Auth";
import EditerArticle from "./pages/EditerArticle";
import EditerJoueur from "./pages/EditerJoueur";
import EditerEquipe from "./pages/EditerEquipe";
import Loading from "./pages/Loading";
import Nutrition from "./pages/Nutrition";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Loading />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "nutrition",
        element: <Nutrition />,
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
                path: "editer",
                element: <EditerArticle />,
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
                path: "editer",
                element: <EditerJoueur />,
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
                path: "editer",
                element: <EditerEquipe />,
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
