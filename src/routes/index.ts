import { Application } from "express";
import indexRouter from "./index.router";
import Webhookouter from "./webhook.router";
export default function SetRouters(app: Application) {
  app.use("/", indexRouter);
  app.use("/Webhook", Webhookouter);
}
