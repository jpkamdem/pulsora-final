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
    await register(req.body);
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
      throw {
        status: 404,
        message: `L'utilisateur ${user.username} n'existe pas`,
      };
    }

    const checkPassword = compareSync(user.password, foundUser.password);

    if (!checkPassword) {
      throw { status: 404, message: "Mot de passe incorrect" };
    }

    const token = jwt.sign(
      { id: foundUser.id, username: foundUser.username },
      SECRET_KEY,
      { expiresIn: "10min" }
    );

    return {
      user: {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      },
      token,
    };
  } catch (err) {
    throw err;
  }
}

export async function loginOne(req: Request, res: Response) {
  try {
    const foundUser = await login(req.body);
    res.cookie("token", foundUser.token, {
      httpOnly: true,
    });

    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ message: getErrorMessage(err) });
    return;
  }
}
