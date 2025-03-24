import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  lessonId: { type: Number, required: true, ref: "Lesson" },
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
});

export const Exam = mongoose.model("Exam", ExamSchema);
