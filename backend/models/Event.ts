import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  classId: { type: Number, ref: "Class" },
});

export const Event = mongoose.model("Event", EventSchema);
