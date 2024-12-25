import * as jwt from "jsonwebtoken";
import { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const SECRET_KEY: Secret = "firstnameBunchOfNumbers4894616";

export async function auth(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Cookies recçus : ", req.cookies);
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Accès non autorisé, token manquant" });
      return;
    }

    const user = jwt.verify(token, SECRET_KEY);

    if (typeof user === "object" && user !== null) {
      req.user = user;
    } else {
      res.clearCookie("token");
      res.status(401).json({ message: "Token invalide ou expiré" });
      return;
    }

    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
}
