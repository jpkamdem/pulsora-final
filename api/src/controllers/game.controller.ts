import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

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
    const game = await gameClient.create({
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
