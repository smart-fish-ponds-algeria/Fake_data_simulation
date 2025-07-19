// @ts-ignore
import express from "express";
import "./config/CheckableEnv";
import { PORT } from "./config/Env";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./utils/Errors";
import { ErrorResponse } from "./utils/Response";
import { HttpCodes } from "./config/Errors";
import SetRouters from "./routes/index";
import bodyParser from "body-parser";
import multer from "multer";
import * as cron from "node-cron";
import {
  sendingDatScheduler,
  sendRandomImageScheduler,
} from "./tasks/scheduler";
export const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST"],
    // credentials: true,
  })
);
const upload = multer();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
SetRouters(app);

app.set("trust proxy", true);

app.use("*", (req, res) =>
  ErrorResponse(
    res,
    HttpCodes.NotImplemented.code,
    HttpCodes.NotImplemented.message
  )
);

app.use(errorMiddleware);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    const port_msg = `Server running on port: ${PORT}.`;
    const url_msg = `The backend is open in: http://localhost:${PORT} .`;
    const max_length = Math.max(url_msg.length, port_msg.length) + 4;
    const n = Math.floor((max_length - port_msg.length) / 2);
    const m = Math.floor((max_length - url_msg.length) / 2);

    console.log(" " + "-".repeat(max_length));
    console.log(`|${" ".repeat(n)}${port_msg}${" ".repeat(n)}|`);
    console.log(`|${" ".repeat(m)}${url_msg}${" ".repeat(m)}|`);
    console.log(" " + "-".repeat(max_length));
    cron.schedule("*/40 * * * * *", async () => {
      try {
        await sendingDatScheduler();
        await sendRandomImageScheduler();
        // await sendRandomvVideoScheduler();
      } catch (err) {
        console.error("Error running the scheduled task:", err);
      }
    });
  });
}
