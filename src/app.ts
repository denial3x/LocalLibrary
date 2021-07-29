import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import router from "./api/router";
import { notFound, errorHandler } from "./middlewares";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello New Mongo REST App",
  });
});

app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
