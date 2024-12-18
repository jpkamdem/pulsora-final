import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});
