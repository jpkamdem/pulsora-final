import { PrismaClient, Role } from "@prisma/client";
import { compareSync } from "bcrypt-ts";
import { Request, Response } from "express";
import { getErrorMessage, hashPassword } from "../middlewares/security";
import { SECRET_KEY } from "../middlewares/auth";
import * as jwt from "jsonwebtoken";

interface LoginCredentials {
  username: string;
  password: string;
  role?: Role;
}

const prisma = new PrismaClient();

export async function register(user: LoginCredentials) {
  try {
    const checkUsername = await prisma.user.findFirst({
      where: { username: user.username },
    });

    if (checkUsername) {
      throw new Error("Le nom d'utilisateur existe déjà");
    }

    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: hashPassword(user.password),
        role: user.role || "USER",
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function registerOne(req: Request, res: Response) {
  try {
    const newUser = await register(req.body);
    res.status(201).json({ message: "Création d'utilisateur réussie" });
  } catch (err) {
    res.status(500).json({ message: getErrorMessage(err) });
    return;
  }
}

export async function login(user: LoginCredentials) {
  try {
    const foundUser = await prisma.user.findFirst({
      where: { username: user.username },
    });

    if (!foundUser) {
      throw new Error(`L'utilisateur ${user.username} n'existe pas`);
    }

    const checkPassword = compareSync(user.password, foundUser.password);

    if (!checkPassword) {
      throw new Error("Le mot de passe n'est pas correct");
    }

    const token = jwt.sign(
      { id: foundUser.id, name: foundUser.username, role: foundUser.role },
      SECRET_KEY,
      { expiresIn: 1800000 }
    );

    return { id: foundUser.id, name: foundUser.username, token };
  } catch (err) {
    throw err;
  }
}

export async function loginOne(req: Request, res: Response) {
  try {
    const foundUser = await login(req.body);
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ message: getErrorMessage(err) });
    return;
  }
}
