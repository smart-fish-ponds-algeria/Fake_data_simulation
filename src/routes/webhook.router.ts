import { Router } from "express";
import { validator } from "../middleware/validator";
import { AddWebHookValidators } from "../services/webhook/webhook.validator";
import { CreateWebhook } from "../controller/webhook.controller";

const Webhookouter = Router();
Webhookouter.route("/").post(AddWebHookValidators, validator, CreateWebhook);
export default Webhookouter;
