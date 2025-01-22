import { Position } from "./hooks";

export type ApiResponse = {
  message: string;
};

export type ApiError = {
  message?: string;
};

export function pos(pos: Position) {
  if (pos === "gk") {
    return "Gardien";
  }
  if (pos === "def") {
    return "Défenseur";
  }

  if (pos === "mf") {
    return "Milieu";
  }

  return "Attaquant";
}
