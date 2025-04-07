import express from "express";
import {
  getStudentSexCount,
  getUserCount,
} from "../controllers/UserController.ts";

const UserRouter = express.Router();

UserRouter.get("/:type", getUserCount);
UserRouter.get("/student/sexCount", getStudentSexCount);

export default UserRouter;
