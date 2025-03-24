import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

export const Parent = mongoose.model("Parent", ParentSchema);
