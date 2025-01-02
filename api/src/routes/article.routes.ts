import { Response, Router } from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller";
import { PrismaClient } from "@prisma/client";
// import { auth } from "../middlewares/auth";

const prisma = new PrismaClient();

const articleRouter = Router();

articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;

// exemple utilisation auth
// articleRouter.get(
//   "/mes-articles",
//   auth,
//   async (req: CustomRequest, res: Response) => {
//     try {
//       const user = req.user;

//       if (!user) {
//         res.status(401).json({ message: "Accès non autorisé" });
//         return;
//       }

//       res.status(200).json({ user });
//       return;
//     } catch (err) {
//       throw new Error(`Erreur : ${err}`);
//     }
//   }
// );
