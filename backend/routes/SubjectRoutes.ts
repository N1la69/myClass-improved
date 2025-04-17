import express from "express";
import {
  createSubject,
  deleteSubjectById,
  getAllSubjects,
  updateSubject,
} from "../controllers/SubjectController.ts";

const SubjectRouter = express.Router();

SubjectRouter.get("/", getAllSubjects);
SubjectRouter.post("/create", createSubject);
SubjectRouter.put("/update/:id", updateSubject);
SubjectRouter.delete("/:id", deleteSubjectById);

export default SubjectRouter;
