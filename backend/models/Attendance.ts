import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  date: { type: Date, required: true },
  present: { type: Boolean, required: true },
  studentId: { type: String, required: true, ref: "Student" },
  lessonId: { type: Number, required: true, ref: "Lesson" },
});

export const Attendance = mongoose.model("Attendance", AttendanceSchema);
