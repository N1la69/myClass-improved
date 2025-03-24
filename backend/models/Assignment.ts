import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  lessonId: { type: Number, required: true, ref: "Lesson" },
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
});

export const Assignment = mongoose.model("Assignment", AssignmentSchema);
