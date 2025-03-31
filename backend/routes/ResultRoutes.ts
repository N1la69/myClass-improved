import express from "express";
import { getAllResults } from "../controllers/ResultController.ts";

const ResultRouter = express.Router();

ResultRouter.get("/", getAllResults);

export default ResultRouter;
