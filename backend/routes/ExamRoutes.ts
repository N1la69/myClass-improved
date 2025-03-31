import express from "express";
import { getAllExams } from "../controllers/ExamController.ts";

const ExamRouter = express.Router();

ExamRouter.get("/", getAllExams);

export default ExamRouter;
