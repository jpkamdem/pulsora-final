import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes";
import articleRouter from "./routes/article.routes";
import teamRouter from "./routes/team.routes";
import incidentRouter from "./routes/incident.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/teams", teamRouter);
app.use("/incidents", incidentRouter);

app.listen(port, () => {
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});
