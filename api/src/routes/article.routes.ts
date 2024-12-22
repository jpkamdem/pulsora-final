import { Request, Response, Router } from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const articleRouter = Router();

articleRouter.get("/", getAllArticles);
articleRouter.get(
  "/mes-articles",
  auth,
  async (req: Request, res: Response) => {
    const userId = (req.token as JwtPayload).id;

    if (!userId) {
      res.status(401).json({ message: "Accès non autorisé, router" });
      return;
    }

    const articles = await prisma.article.findMany({
      where: { authorId: userId },
    });

    res.status(200).json(articles);
  }
);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
