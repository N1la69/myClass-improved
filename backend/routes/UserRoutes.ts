import express from "express";
import {
  getAttendanceCount,
  getStudentSexCount,
  getUserCount,
} from "../controllers/UserController.ts";

const UserRouter = express.Router();

UserRouter.get("/:type", getUserCount);
UserRouter.get("/student/sexCount", getStudentSexCount);
UserRouter.get("/student/weekly-attendance", getAttendanceCount);

export default UserRouter;
