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

// user routes import
import userRoutes from "./routes/user.routes.js";
app.use("/users", userRoutes);

// project routes import
import projectRoutes from "./routes/project.routes.js";
app.use("/projects", projectRoutes);

export default app;
