import { Router } from "express";
import { register, login } from "../controllers/connection.controller";

const connectionRouter = Router();

connectionRouter.post("/register", register);
connectionRouter.post("/login", login);

export default connectionRouter;
