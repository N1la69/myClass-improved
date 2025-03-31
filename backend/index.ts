import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import TeacherRouter from "./routes/TeacherRoutes.ts";
import StudentRouter from "./routes/StudentRoutes.ts";
import ParentRouter from "./routes/ParentRoutes.ts";
import SubjectRouter from "./routes/SubjectRoutes.ts";
import ClassRouter from "./routes/ClassRoutes.ts";
import ExamRouter from "./routes/ExamRoutes.ts";
import AssignmentRouter from "./routes/AssignmentRoutes.ts";
import ResultRouter from "./routes/ResultRoutes.ts";
import EventRouter from "./routes/EventRoutes.ts";
import AnnouncementRouter from "./routes/AnnouncementRoutes.ts";

dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI as string;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/teachers", TeacherRouter);
app.use("/students", StudentRouter);
app.use("/parents", ParentRouter);
app.use("/subjects", SubjectRouter);
app.use("/classes", ClassRouter);
app.use("/exams", ExamRouter);
app.use("/assignments", AssignmentRouter);
app.use("/results", ResultRouter);
app.use("/events", EventRouter);
app.use("/announcements", AnnouncementRouter);

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
