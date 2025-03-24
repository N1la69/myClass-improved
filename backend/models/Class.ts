import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  supervisorId: { type: String, ref: "Teacher" },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  gradeId: { type: Number, required: true, ref: "Grade" },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  announcements: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Announcement" },
  ],
});

export const Class = mongoose.model("Class", ClassSchema);
