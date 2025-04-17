import express from "express";
import {
  createClass,
  deleteClassById,
  getAllClasses,
  getClassByStudentId,
  getClassBySupervisorId,
  updateClass,
} from "../controllers/ClassController.ts";

const ClassRouter = express.Router();

ClassRouter.get("/", getAllClasses);
ClassRouter.get("/by-supervisor", getClassBySupervisorId);
ClassRouter.get("/by-student", getClassByStudentId);
ClassRouter.post("/create", createClass);
ClassRouter.put("/update/:id", updateClass);
ClassRouter.delete("/:id", deleteClassById);

export default ClassRouter;
