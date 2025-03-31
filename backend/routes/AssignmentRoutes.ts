import express from "express";
import { getAllAssignments } from "../controllers/AssignmentController.ts";

const AssignmentRouter = express.Router();

AssignmentRouter.get("/", getAllAssignments);

export default AssignmentRouter;
