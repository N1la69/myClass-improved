import express from "express";
import {
  getAllLessons,
  getLessonById,
} from "../controllers/LessonController.ts";

const LessonRouter = express.Router();

LessonRouter.get("/", getAllLessons);
LessonRouter.get("/lesson-id", getLessonById);

export default LessonRouter;
