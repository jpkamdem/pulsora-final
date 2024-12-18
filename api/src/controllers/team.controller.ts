import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PlayerInterface } from "./player.controller";
import { GameInterface } from "./game.controller";

export interface TeamInterface {
  name: string;
  wins: number;
  loses: number;
  players?: PlayerInterface[];
  homeGame?: GameInterface[];
  awayGame?: GameInterface[];
}

const teamClient = new PrismaClient().team;

// getAllTeams
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const allTeams = await teamClient.findMany({
      include: {
        players: true,
        homeGame: true,
        awayGame: true,
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

    const team = await teamClient.findUnique({
      where: { id: Number(teamId) },
    });

    res.status(200).json({ data: team });
  } catch (e) {
    console.log(e);
  }
};

// createTeam
export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, wins, loses, players, homeGame, awayGame }: TeamInterface =
      req.body;

    const team = await teamClient.create({
      data: {
        name,
        wins,
        loses,
        players: {
          create: players?.map((player) => ({
            firstname: player.firstname,
            lastname: player.lastname,
            position: player.position,
            number: player.number,
            status: player.status,
          })),
        },
        homeGame: {
          create: homeGame?.map((game) => ({
            teamOne: game.teamOne.id,
            teamTwo: game.teamTwo.id,
            scoreOne: game.scoreOne,
            scoreTwo: game.scoreTwo,
          })),
        },
        awayGame: {
          create: awayGame?.map((game) => ({
            teamOne: game.teamOne.id,
            teamTwo: game.teamTwo.id,
            scoreOne: game.scoreOne,
            scoreTwo: game.scoreTwo,
          })),
        },
      },
    });

    res.status(201).json({ data: team });
  } catch (e) {
    console.log(e);
  }
};

// updateTeam

// deleteTeam
