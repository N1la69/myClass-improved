import mongoose from "mongoose";
import { UserSex } from "./enums.ts";

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  address: { type: String, required: true },
  img: { type: String },
  bloodType: { type: String, required: true },
  sex: { type: String, enum: Object.values(UserSex), required: true },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String, required: true, ref: "Parent" },
  classId: { type: Number, required: true, ref: "Class" },
  gradeId: { type: Number, required: true, ref: "Grade" },
  birthday: { type: Date, required: true },
  attendances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
});

export const Student = mongoose.model("Student", StudentSchema);
