import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

export const Admin = mongoose.model("Admin", AdminSchema);
