import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import morgan from "morgan";
import connectToDB from "./db/db.js";
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
