import express from "express";
import { getAllEvents } from "../controllers/EventController.ts";

const EventRouter = express.Router();

EventRouter.get("/", getAllEvents);

export default EventRouter;
