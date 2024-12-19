import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { TeamInterface } from "./team.controller";

export interface GameInterface {
  homeTeamId: TeamInterface;
  awayTeamId: TeamInterface;
  homeScore: number;
  awayScore: number;
}
