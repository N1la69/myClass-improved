import express from "express";
import {
  getAllStudents,
  getStudentsByClass,
} from "../controllers/StudentController.ts";

const StudentRouter = express.Router();

StudentRouter.get("/", getAllStudents);
StudentRouter.get("/by-class", getStudentsByClass);

export default StudentRouter;
