import express from "express";
import {
  getAllClasses,
  getClassBySupervisorId,
} from "../controllers/ClassController.ts";

const ClassRouter = express.Router();

ClassRouter.get("/", getAllClasses);
ClassRouter.get("/by-supervisor", getClassBySupervisorId);

export default ClassRouter;
