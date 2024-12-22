import * as jwt from "jsonwebtoken";
import { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET_KEY: Secret = "firstnameBunchOfNumbers4894616";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log("Authorization header: ", authorizationHeader);

    if (!authorizationHeader) {
      res.status(401).json({ message: "Token manquant. Authentifie-toi" });
      return;
    }

    const token = authorizationHeader?.replace("Bearer ", "");
    console.log("Token extrait : ", token);

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (e) {
    res.status(401).send("Token manquant. Authentifie-toi");
  }
};
