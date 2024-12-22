import { Article, PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../middlewares/security";
import { compareSync } from "bcrypt-ts";

export interface UserInterface {
  username: string;
  password: string;
  role: Role;
  articles?: Article[];
}

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
    const userIdValidation = !userId || isNaN(Number(userId));
    if (userIdValidation) {
      res.status(404).json({ message: "ID invalide : ", userId });
      return;
    }

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

// updateUser
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userIdValidation = !userId || isNaN(Number(userId));
    if (userIdValidation) {
      res.status(404).json({ message: "ID invalide : ", userId });
      return;
    }

    const { username, password, role, articles }: Partial<UserInterface> =
      req.body;

    const updateData: any = {};
    if (username) updateData.username = username;
    if (password) updateData.password = hashPassword(password);
    if (role) updateData.role = role;
    if (articles) {
      updateData.articles = {
        create: articles.map((article) => ({
          title: article.title,
          body: article.body,
        })),
      };
    }

    const user = await userClient.update({
      where: { id: Number(userId) },
      data: updateData,
      include: { articles: true },
    });

    res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};

// deleteUser
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userIdValidation = !userId || isNaN(Number(userId));
    if (userIdValidation) {
      res.status(400).json({ message: "ID invalide : ", userId });
      return;
    }

    const user = await userClient.delete({
      where: { id: Number(userId) },
    });

    res.status(204).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};
