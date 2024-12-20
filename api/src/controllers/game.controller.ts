import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { updateTeamScore } from "./team.controller";

export interface GameInterface {
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  date: Date;
}

const gameClient = new PrismaClient().game;

// getAllGames
export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await gameClient.findMany();

    res.status(200).json({ data: games });
  } catch (e) {
    console.log(e);
  }
};

// getGameById
export const getGameById = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const gameIdValidation = !gameId || isNaN(Number(gameId));
    if (gameIdValidation) {
      res.status(404).json({ message: "ID invalide : ", gameId });
      return;
    }

    const game = await gameClient.findUnique({
      where: { id: Number(gameId) },
    });

    res.status(200).json({ data: game });
  } catch (e) {
    console.log(e);
  }
};
// createGame
export const createGame = async (req: Request, res: Response) => {
  try {
    const { homeTeamId, awayTeamId }: GameInterface = req.body;
    if (homeTeamId === awayTeamId) {
      res
        .status(404)
        .json({ message: "Veuillez choisir deux équipes différentes." });
      return;
    }
    const gameBodyValidation = !homeTeamId || !awayTeamId;
    if (gameBodyValidation) {
      res.status(404).json({ message: "Veuillez compléter tous les champs" });
      return;
    }

    const homeScore = Math.floor(Math.random() * 6);
    const awayScore = Math.floor(Math.random() * 6);

    const game = await gameClient.create({
      data: {
        homeTeamId,
        homeScore: homeScore,
        awayTeamId,
        awayScore: awayScore,
        date: new Date(),
      },
    });

    if (homeScore > awayScore) {
      await updateTeamScore(homeTeamId, 1, 0);
      await updateTeamScore(awayTeamId, 0, 1);
    } else if (homeScore < awayScore) {
      await updateTeamScore(awayTeamId, 1, 0);
      await updateTeamScore(homeTeamId, 0, 1);
    } else {
      console.log("Match nul, aucune mise à jour");
    }

    res.status(200).json({ data: game });
  } catch (e) {
    console.log(e);
  }
};

// updateGame
export const updateGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const gameIdValidation = !gameId || isNaN(Number(gameId));
    if (gameIdValidation) {
      res.status(404).json({ message: "ID invalide : ", gameId });
    }

    const { homeTeamId, awayTeamId }: GameInterface = req.body;
    if (homeTeamId === awayTeamId) {
      res
        .status(404)
        .json({ message: "Veuillez choisir deux équipes différentes." });
      return;
    }

    const game = await gameClient.update({
      where: { id: Number(gameId) },
      data: {
        homeTeamId,
        homeScore: Math.floor(Math.random() * 6),
        awayTeamId,
        awayScore: Math.floor(Math.random() * 6),
        date: new Date(),
      },
    });

    res.status(200).json({ data: game });
  } catch (e) {
    console.log(e);
  }
};

// deleteGame
export const deleteGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    const gameIdValidation = !gameId || isNaN(Number(gameId));
    if (gameIdValidation) {
      res.status(404).json({ message: "ID invalide : ", gameId });
    }

    const game = await gameClient.delete({
      where: { id: Number(gameId) },
    });

    res.status(204).json({ data: game });
  } catch (e) {
    console.log(e);
  }
};
