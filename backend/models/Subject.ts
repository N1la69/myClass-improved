import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  name: { type: String, required: true, unique: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
});

export const Subject = mongoose.model("Subject", SubjectSchema);
