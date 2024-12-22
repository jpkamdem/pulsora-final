import { Router } from "express";
import { registerOne, loginOne } from "../controllers/connection.controller";
import { auth } from "../middlewares/auth";

const connectionRouter = Router();

connectionRouter.post("/register", registerOne);
connectionRouter.post("/login", loginOne);

export default connectionRouter;
