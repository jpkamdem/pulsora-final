import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PlayerInterface } from "./player.controller";

export interface IncidentInterface {
  type: string;
  players: PlayerInterface[];
}

const incidentClient = new PrismaClient().incident;

// getAllIncidents
export const getAllIncidents = async (req: Request, res: Response) => {
  try {
    const incident = await incidentClient.findMany({
      include: {
        players: true,
      },
    });

    res.status(200).json({ data: incident });
  } catch (e) {
    console.log(e);
  }
};

// getIncidentById
export const getIncidentById = async (req: Request, res: Response) => {
  try {
    const incidentId = req.params.id;
    const incidentIdValidation = !incidentId || isNaN(Number(incidentId));
    if (incidentIdValidation) {
      res.status(404).json({ message: "ID invalide : ", incidentId });
    }

    const incident = await incidentClient.findUnique({
      where: { id: Number(incidentId) },
    });

    res.status(200).json({ data: incident });
  } catch (e) {
    console.log(e);
  }
};

// createIncident
export const createIncident = async (req: Request, res: Response) => {
  try {
    const { type }: IncidentInterface = req.body;
    const incidentBodyValidation = !type;
    if (incidentBodyValidation) {
      res.status(404).json({ message: "Veuillez compléter tous les champs" });
    }

    const incident = await incidentClient.create({
      data: {
        type: type,
        players: undefined,
      },
    });

    res.status(201).json({ data: incident });
  } catch (e) {
    console.log(e);
  }
};
// updateIncident
export const updateIncident = async (req: Request, res: Response) => {
  try {
    const incidentId = req.params.id;
    const incidentIdValidation = !incidentId || isNaN(Number(incidentId));
    if (incidentIdValidation) {
      res.status(404).json({ message: "ID invalide : ", incidentId });
    }

    const { type }: IncidentInterface = req.body;
    const incidentBodyValidation = !type;
    if (incidentBodyValidation) {
      res.status(404).json({ message: "Veuillez compléter tous les champs" });
    }

    const incident = await incidentClient.update({
      where: { id: Number(incidentId) },
      data: {
        type,
      },
    });

    res.status(200).json({ data: incident });
  } catch (e) {
    console.log(e);
  }
};

// deleteIncident
export const deleteIncident = async (req: Request, res: Response) => {
  try {
    const incidentId = req.params.id;
    const incidentIdValidation = !incidentId || isNaN(Number(incidentId));
    if (incidentIdValidation) {
      res.status(404).json({ message: "ID invalide : ", incidentId });
    }

    const incident = await incidentClient.delete({
      where: { id: Number(incidentId) },
    });

    res.status(204).json({ data: incident });
  } catch (e) {
    console.log(e);
  }
};
