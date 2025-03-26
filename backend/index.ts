import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import TeacherRouter from "./routes/TeacherRoutes.ts";
import StudentRouter from "./routes/StudentRoutes.ts";
import ParentRouter from "./routes/ParentRoutes.ts";

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

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
