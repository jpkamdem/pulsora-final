import { Router } from "express";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.get("/", getAllGames);
gameRouter.get("/:id", getGameById);
gameRouter.post("/", createGame);
gameRouter.put("/:id", updateGame);
gameRouter.delete("/:id", deleteGame);

export default gameRouter;
