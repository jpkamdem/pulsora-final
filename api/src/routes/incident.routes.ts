import { Router } from "express";
import {
  createIncident,
  deleteIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
} from "../controllers/incident.controller";

const incidentRouter = Router();

incidentRouter.get("/", getAllIncidents);
incidentRouter.get("/:id", getIncidentById);
incidentRouter.post("/", createIncident);
incidentRouter.put("/:id", updateIncident);
incidentRouter.delete("/:id", deleteIncident);

export default incidentRouter;
