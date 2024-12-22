import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt-ts";
import { Request, Response } from "express";
import { UserInterface } from "./user.controller";
import { getErrorMessage, hashPassword } from "../middlewares/security";
import { SECRET_KEY } from "../middlewares/auth";
import * as jwt from "jsonwebtoken";

interface LoginCredentials {
  username: string;
  password: string;
}

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role, articles }: Partial<UserInterface> =
      req.body;

    const userBodyValidation = !username || !password || !role;
    if (userBodyValidation) {
      res.status(404).json({ message: "Veuillez compléter tous les champs" });
      return;
    }

    const pw = password as string;
    const psd = username as string;
    const hashedPassword = hashPassword(pw);

    const checkUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (checkUsername) {
      res
        .status(404)
        .json({ message: `L'utilisateur ${username} existe déjà` });
      return;
    }

    const user = await prisma.user.create({
      data: {
        username: psd,
        password: hashedPassword,
        role: role || "USER",
        articles: undefined,
      },
    });

    res.status(201).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: LoginCredentials = req.body;

    const userBodyValidation = !username || !password;
    if (userBodyValidation) {
      res.status(404).json({ message: "Veuillez compléter tous les champs" });
      return;
    }

    if (typeof username !== "string") {
      res
        .status(404)
        .json({ message: "Entre une valeur correcte pour l'username" });
      return;
    }

    if (typeof password !== "string") {
      res
        .status(404)
        .json({ message: "Entre une valeur correcte pour le password" });
      return;
    }

    const checkUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (!checkUsername) {
      res
        .status(404)
        .json({ message: `L'utilisateur ${username} n'existe pas` });
      return;
    }

    const checkPassword = compareSync(password, checkUsername?.password);

    if (!checkPassword) {
      res.status(404).json({ message: "Mot de passe incorrect" });
      return;
    }

    // handleConnection
    const token = jwt.sign(
      { id: checkUsername.id, name: checkUsername.username },
      SECRET_KEY,
      { expiresIn: "1800000" }
    );

    res.status(200).json({
      message: `Vous êtes authentifié en tant que ${checkUsername.username}`,
      user: {
        id: checkUsername.id,
        name: checkUsername.username,
        role: checkUsername.role,
      },
      token,
    });
  } catch (e) {
    console.log(e);
  }
};
