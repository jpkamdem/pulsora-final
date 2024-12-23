import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export interface ArticleInterface {
  title: string;
  body: string;
}

interface ArticleInterfaceBis extends ArticleInterface {
  authorId: number;
}

const articleClient = new PrismaClient().article;

// getAllArticles
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const allArticles = await articleClient.findMany();

    res.status(200).json({ data: allArticles });
  } catch (e) {
    console.log(e);
  }
};

// getArticleById
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const articleIdValidation = !articleId || isNaN(Number(articleId));
    if (articleIdValidation) {
      res.status(404).json({ message: "ID invalide : ", articleId });
      return;
    }

    const article = await articleClient.findUnique({
      where: { id: Number(articleId) },
    });

    if (!article) {
      res.status(404).json({ message: "Article non trouvé" });
      return;
    }

    res.status(200).json({ data: article });
    return;
  } catch (e) {
    res.status(404).json({ message: "Erreur interne du serveur" });
  }
};

// createArticle
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, body, authorId }: ArticleInterfaceBis = req.body;

    const article = await articleClient.create({
      data: {
        title,
        body,
        authorId,
      },
    });

    res.status(201).json({ data: article });
  } catch (e) {
    console.log(e);
  }
};

// updateArticle
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const articleIdValidation = !articleId || isNaN(Number(articleId));
    if (articleIdValidation) {
      res.status(404).json({ message: "ID invalide : ", articleId });
    }

    const { title, body, authorId }: ArticleInterfaceBis = req.body;

    const article = await articleClient.update({
      where: { id: Number(articleId) },
      data: {
        title,
        body,
        authorId,
      },
    });

    res.status(200).json({ data: article });
  } catch (e) {
    console.log(e);
  }
};

// deleteArticle
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const articleIdValidation = !articleId || isNaN(Number(articleId));
    if (articleIdValidation) {
      res.status(404).json({ message: "ID invalide : ", articleId });
    }

    const article = await articleClient.delete({
      where: { id: Number(articleId) },
    });

    res.json(204).json({ data: article });
  } catch (e) {
    console.log(e);
  }
};
