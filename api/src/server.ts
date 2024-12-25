import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import articleRouter from "./routes/article.routes";
import teamRouter from "./routes/team.routes";
import incidentRouter from "./routes/incident.routes";
import playerRouter from "./routes/player.routes";
import gameRouter from "./routes/game.routes";
import connectionRouter from "./routes/connection.routes";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/teams", teamRouter);
app.use("/incidents", incidentRouter);
app.use("/players", playerRouter);
app.use("/games", gameRouter);
app.use("/connection", connectionRouter);

app.listen(port, () => {
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});
