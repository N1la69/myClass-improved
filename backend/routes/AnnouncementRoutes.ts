import express from "express";
import {
  getAllAnnouncements,
  getAnnouncementsByClassId,
} from "../controllers/AnnouncementController.ts";

const AnnouncementRouter = express.Router();

AnnouncementRouter.get("/", getAllAnnouncements);
AnnouncementRouter.get("/class/:classId", getAnnouncementsByClassId);

export default AnnouncementRouter;
