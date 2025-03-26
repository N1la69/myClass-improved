import express from "express";
import { getAllParents } from "../controllers/ParentController.ts";

const ParentRouter = express.Router();

ParentRouter.get("/", getAllParents);

export default ParentRouter;
