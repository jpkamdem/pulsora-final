import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PlayerInterface } from "./player.controller";
import { GameInterface } from "./game.controller";

export interface TeamInterface {
  name: string;
  wins: number;
  loses: number;
  players?: PlayerInterface[];
  homeGames?: GameInterface[];
  awayGames?: GameInterface[];
}

const teamClient = new PrismaClient().team;

// getAllTeams
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const allTeams = await teamClient.findMany({
      include: {
        players: true,
        homeGames: true,
        awayGames: true,
      },
    });

    res.status(200).json({ data: allTeams });
  } catch (e) {
    console.log(e);
  }
};

// getTeamById
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const teamIdValidation = !teamId || isNaN(Number(teamId));
    if (teamIdValidation) {
      res.status(404).json({ message: "ID invalide : ", teamId });
      return;
    }

    const team = await teamClient.findUnique({
      where: { id: Number(teamId) },
      include: {
        players: true,
        homeGames: true,
        awayGames: true,
      },
    });

    res.status(200).json({ data: team });
  } catch (e) {
    console.log(e);
  }
};

// createTeam
export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, wins, loses, players, homeGames, awayGames }: TeamInterface =
      req.body;

    const teamBodyValidation =
      !name || wins === undefined || loses === undefined;
    if (teamBodyValidation) {
      res.status(404).json({ message: "Veuillez compléter tous les champs" });
      return;
    }

    const team = await teamClient.create({
      data: {
        name,
        wins,
        loses,
        players: undefined,
        homeGames: undefined,
        awayGames: undefined,
      },
    });

    res.status(201).json({ data: team });
  } catch (e) {
    console.log(e);
  }
};

// updateTeam
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const teamIdValidation = !teamId || isNaN(Number(teamId));
    if (teamIdValidation) {
      res.status(404).json({ message: "ID invalide : ", teamId });
      return;
    }

    const { name, wins, loses, players, homeGames, awayGames }: TeamInterface =
      req.body;

    const team = await teamClient.update({
      where: { id: Number(teamId) },
      data: {
        name,
        wins,
        loses,
        players: undefined,
        homeGames: undefined,
        awayGames: undefined,
      },
    });

    res.status(200).json({ data: team });
  } catch (e) {
    console.log(e);
  }
};

// deleteTeam
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const teamIdValidation = !teamId || isNaN(Number(teamId));
    if (teamIdValidation) {
      res.status(404).json({ message: "ID invalide : ", teamId });
      return;
    }

    const team = await teamClient.delete({
      where: { id: Number(teamId) },
    });
    res.status(204).json({ data: team });
  } catch (e) {
    console.log(e);
  }
};
