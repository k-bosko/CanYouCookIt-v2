import express from "express";
import logger from "morgan";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import indexRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //parse form data
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

export default app;
