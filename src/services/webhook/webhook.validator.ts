import { body } from "express-validator";

export const AddWebHookValidators = [
  body("callback_url")
    .exists()
    .withMessage("callback_url is required")
    .isURL()
    .withMessage("callback_url should be a valid url link"),
  body("machine")
    .exists()
    .withMessage("machine is required")
    .isString()
    .withMessage("machine must be a string "),
];
