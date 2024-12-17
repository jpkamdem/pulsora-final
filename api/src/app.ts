import express from "express";
import userRoutes from "./routes/userRoutes";
import articleRoutes from "./routes/articleRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/articles", articleRoutes);

export default app;
