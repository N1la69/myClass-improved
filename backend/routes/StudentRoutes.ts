import express from "express";
import { getAllStudents } from "../controllers/StudentController.ts";

const StudentRouter = express.Router();

StudentRouter.get("/", getAllStudents);

export default StudentRouter;
