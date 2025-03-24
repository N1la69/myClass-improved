import mongoose from "mongoose";
import { UserSex } from "./enums";

const TeacherSchema = new mongoose.Schema({
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
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  birthday: { type: Date, required: true },
});

export const Teacher = mongoose.model("Teacher", TeacherSchema);
