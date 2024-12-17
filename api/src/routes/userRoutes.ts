import express from "express";
import {
  createUserHandler,
  getUsersHandler,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsersHandler);
router.post("/", createUserHandler);

export default router;
