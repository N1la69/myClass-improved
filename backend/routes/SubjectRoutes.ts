import express from "express";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
} from "../controllers/SubjectController.ts";

const SubjectRouter = express.Router();

SubjectRouter.get("/", getAllSubjects);
SubjectRouter.post("/create", createSubject);
SubjectRouter.put("/update/:id", updateSubject);

export default SubjectRouter;
