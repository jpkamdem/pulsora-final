import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { TeamInterface } from "./team.controller";

export interface GameInterface {
  teamOne: TeamInterface;
  teamTwo: TeamInterface;
  scoreOne: number;
  scoreTwo: number;
}
