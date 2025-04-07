import express from "express";
import { getAllLessons } from "../controllers/LessonController.ts";

const LessonRouter = express.Router();

LessonRouter.get("/", getAllLessons);

export default LessonRouter;
