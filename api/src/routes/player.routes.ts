import { Router } from "express";
import {
  createPlayer,
  deletePlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
} from "../controllers/player.controller";

const playerRouter = Router();

playerRouter.get("/", getAllPlayers);
playerRouter.get("/:id", getPlayerById);
playerRouter.post("/", createPlayer);
playerRouter.put("/:id", updatePlayer);
playerRouter.delete("/", deletePlayer);

export default playerRouter;
