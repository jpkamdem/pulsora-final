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
