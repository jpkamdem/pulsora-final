import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PlayerInterface } from "./player.controller";

export interface IncidentInterface {
  type: string;
  players: PlayerInterface[];
}
