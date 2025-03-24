import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  level: { type: Number, required: true, unique: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

export const Grade = mongoose.model("Grade", GradeSchema);
