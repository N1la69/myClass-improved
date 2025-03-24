import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  score: { type: Number, required: true },
  examId: { type: Number, ref: "Exam" },
  assignmentId: { type: Number, ref: "Assignment" },
  studentId: { type: String, required: true, ref: "Student" },
});

export const Result = mongoose.model("Result", ResultSchema);
