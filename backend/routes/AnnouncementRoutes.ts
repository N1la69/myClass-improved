import express from "express";
import { getAllAnnouncements } from "../controllers/AnnouncementController.ts";

const AnnouncementRouter = express.Router();

AnnouncementRouter.get("/", getAllAnnouncements);

export default AnnouncementRouter;
