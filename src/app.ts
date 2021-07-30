import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { usersController } from "./rest/api/users-controller";
import { notFound, errorHandler } from "./middlewares";
import mongoose from "mongoose";

dotenv.config();

const mongoDBURL = `mongodb://${process.env.DB_HOST}/locallibrary`;
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error: "));

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(notFound);
app.use(errorHandler);
app.use("/api/v1/users", usersController);

export default app;
