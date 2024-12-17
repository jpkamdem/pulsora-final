import express from "express";
import {
  createArticleHandler,
  getArticlesHandler,
} from "../controllers/articleController";

const router = express.Router();

router.get("/", getArticlesHandler);
router.post("/", createArticleHandler);

export default router;
