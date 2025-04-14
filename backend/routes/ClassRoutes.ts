import express from "express";
import {
  getAllClasses,
  getClassByStudentId,
  getClassBySupervisorId,
} from "../controllers/ClassController.ts";

const ClassRouter = express.Router();

ClassRouter.get("/", getAllClasses);
ClassRouter.get("/by-supervisor", getClassBySupervisorId);
ClassRouter.get("/by-student", getClassByStudentId);

export default ClassRouter;
