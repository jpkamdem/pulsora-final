import { Request, Response } from "express";
import { createArticle, getAllArticles } from "../services/articleService";

export async function getArticlesHandler(req: Request, res: Response) {
  const articles = await getAllArticles();
  res.status(200).json(articles);
}

export async function createArticleHandler(req: Request, res: Response) {
  const { title, body, authorId } = req.body;
  const article = await createArticle(title, body, authorId);
  res.status(201).json(article);
}
