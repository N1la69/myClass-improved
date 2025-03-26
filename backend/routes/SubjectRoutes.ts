import express from "express";
import { getAllSubjects } from "../controllers/SubjectController.ts";

const SubjectRouter = express.Router();

SubjectRouter.get("/", getAllSubjects);

export default SubjectRouter;
