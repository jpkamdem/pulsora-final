import { Incident, Position, PrismaClient, Status } from "@prisma/client";
import { Request, Response } from "express";

export interface PlayerInterface {
  firstname: string;
  lastname: string;
  position: Position;
  number: number;
  teamId?: number;
  incidents?: Incident[];
  status: Status;
}

const playerClient = new PrismaClient().player;

// getAllPlayers
export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await playerClient.findMany({
      include: {
        incidents: true,
      },
    });

    res.status(200).json({ data: players });
  } catch (e) {
    console.log(e);
  }
};

// getPlayerById
export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const playerId = req.params.id;
    const playerIdValidation = !playerId || isNaN(Number(playerId));
    if (playerIdValidation) {
      res.status(404).json({ message: "ID invalide : ", playerId });
      return;
    }

    const player = await playerClient.findUnique({
      where: { id: Number(playerId) },
      include: {
        incidents: true,
      },
    });

    res.status(200).json({ data: player });
  } catch (e) {
    console.log(e);
  }
};

// createPlayer
export const createPlayer = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      number,
      position,
      status,
      incidents,
      teamId,
    }: PlayerInterface = req.body;

    const playerBodyValidation =
      !firstname || !lastname || !number || !position || !status;
    if (playerBodyValidation) {
      res.status(404).json({ message: "Veuillez compléter tous les champs" });
    }

    const player = await playerClient.create({
      data: {
        firstname,
        lastname,
        number,
        position,
        status,
        teamId,
        incidents: incidents ? { create: incidents } : undefined,
      },
    });

    res.status(201).json({ data: player });
  } catch (e) {
    console.log(e);
  }
};

// updatePlayer
export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const playerId = req.params.id;
    const playerIdValidation = !playerId || isNaN(Number(playerId));
    if (playerIdValidation) {
      res.status(404).json({ message: "ID invalide : ", playerId });
      return;
    }

    const {
      firstname,
      lastname,
      number,
      position,
      status,
      incidents,
      teamId,
    }: PlayerInterface = req.body;

    const player = await playerClient.update({
      where: { id: Number(playerId) },
      data: {
        firstname,
        lastname,
        number,
        position,
        status,
        teamId,
        incidents: incidents ? { create: incidents } : undefined,
      },
    });

    res.status(200).json({ data: player });
  } catch (e) {
    console.log(e);
  }
};

// deletePlayer
export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const playerId = req.params.id;
    const playerIdValidation = !playerId || isNaN(Number(playerId));
    if (playerIdValidation) {
      res.status(404).json({ message: "ID invalide : ", playerId });
      return;
    }

    const player = await playerClient.delete({
      where: { id: Number(playerId) },
    });

    res.status(204).json({ data: player });
  } catch (e) {
    console.log(e);
  }
};
