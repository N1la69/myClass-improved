import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeachersByClass,
} from "../controllers/TeacherController.ts";

const TeacherRouter = express.Router();

TeacherRouter.get("/", getAllTeachers);
TeacherRouter.get("/by-class", getTeachersByClass);
TeacherRouter.post("/create", createTeacher);

export default TeacherRouter;
