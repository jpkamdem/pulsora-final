import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";

export async function getUsersHandler(req: Request, res: Response) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function createUserHandler(req: Request, res: Response) {
  const { username, password, role } = req.body;
  const user = await createUser(username, password, role);
  res.status(201).json(user);
}
