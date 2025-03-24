import mongoose from "mongoose";
import { Day } from "./enums";

const LessonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  name: { type: String, required: true },
  day: { type: String, enum: Object.values(Day), required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  subjectId: { type: Number, required: true, ref: "Subject" },
  classId: { type: Number, required: true, ref: "Class" },
  teacherId: { type: String, required: true, ref: "Teacher" },
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  attendances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
});

export const Lesson = mongoose.model("Lesson", LessonSchema);
