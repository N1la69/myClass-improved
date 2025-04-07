import express from "express";
import {
  getAllEvents,
  getEventByDate,
} from "../controllers/EventController.ts";

const EventRouter = express.Router();

EventRouter.get("/", getAllEvents);
EventRouter.get("/event-list", getEventByDate);

export default EventRouter;
