import * as jwt from "jsonwebtoken";
import { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET_KEY: Secret = "firstnameBunchOfNumbers4894616";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  console.log("Authorization header : ", authHeader);

  const token = authHeader?.split(" ")[1];
  console.log("Token extrait : ", token);

  if (!token) {
    console.log("Token non fourni");
    res.status(401).json({ message: "Accès non autorisé, auth" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token décodé : ", decoded);
    req.token = decoded;
    next();
  } catch (err) {
    console.log("Erreur de vérification du token : ", err);
    res.status(401).json({ message: "Token invalide, auth 2" });
    return;
  }
}
