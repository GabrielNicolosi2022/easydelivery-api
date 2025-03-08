import "dotenv/config";
import express, { json, urlencoded } from "express";
import __dirname from "./dirname";
import config from "./config/config.js";
import cors from "cors";
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js";

/* CONFIGURATIONS */
const app = express();
const PORT = config.server.port;
// const DB = config.db.cs;

/* Express */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cors());

/* Logger */

/* Morgan */
app.use(morgan("dev"));

/* Routes */
app.use(indexRouter);

/* Server */
const server = app.listen(PORT, (err) => {
  // db
  if (err) {
    console.error("connection error", err.message);
    return;
  }
  console.log(`Running on port ${PORT}, in ${environment.env} environment`);
});
