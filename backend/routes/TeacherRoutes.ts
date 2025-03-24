import express from "express";
import {
  getAllTeachers,
  getTeachersByClass,
} from "../controllers/TeacherController.ts";

const TeacherRouter = express.Router();

TeacherRouter.get("/", getAllTeachers);
TeacherRouter.get("/by-class", getTeachersByClass);

export default TeacherRouter;
