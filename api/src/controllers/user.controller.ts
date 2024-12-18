import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const userClient = new PrismaClient().user;

// getAllUsers
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userClient.findMany({
      include: {
        articles: true,
      },
    });

    res.status(200).json({ data: allUsers });
  } catch (e) {
    console.log(e);
  }
};

// getUserById
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userClient.findUnique({
      where: {
        id: Number(userId),
      },
      include: { articles: true },
    });

    res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};

// createUser
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role, articles } = req.body;
    const user = await userClient.create({
      data: {
        username,
        password,
        role: role || "USER",
        articles: {
          create: articles,
        },
      },
    });

    res.status(201).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};

export interface ArticleInterface {
  title: string;
  body: string;
}

// updateUser
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { username, password, role, articles } = req.body;
    const articlesOperations = articles?.map((article: ArticleInterface) => ({
      title: article.title,
      body: article.body,
    }));

    const user = await userClient.update({
      where: { id: Number(userId) },
      data: {
        username,
        password,
        role: role || "USER",
        articles: {
          create: articlesOperations,
        },
      },
      include: { articles: true },
    });

    res.status(201).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};

// deleteUser
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await userClient.delete({
      where: { id: Number(userId) },
    });

    res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};
