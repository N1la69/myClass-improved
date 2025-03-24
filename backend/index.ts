import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI as string;
//console.log("MongoDB URI:", MONGODB_URI);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
