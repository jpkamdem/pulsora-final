import { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from "../controllers/team.controller";

const teamRouter = Router();

teamRouter.get("/", getAllTeams);
teamRouter.get("/:id", getTeamById);
teamRouter.post("/", createTeam);
teamRouter.put("/:id", updateTeam);
teamRouter.delete("/:id", deleteTeam);

export default teamRouter;
