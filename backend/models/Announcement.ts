import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  classId: { type: Number, ref: "Class" },
});

export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
