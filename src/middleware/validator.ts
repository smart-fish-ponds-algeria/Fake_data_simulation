import { NextFunction, Response,Request } from "express";
// import { MyReques } from "../types/Express";
import { ErrorResponse } from "../utils/Response";
import { formatString } from "../utils/Strings";
import { HttpCodes, ExitCodes } from "../config/Errors";
import { validationResult } from "express-validator";

export async function validator(
  // req: MyRequest<null>,
  req:Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ErrorResponse(
      res,
      HttpCodes.BadRequest.code,
      ExitCodes.ERROR_INVALID_INPUT.type,
      formatString(ExitCodes.ERROR_INVALID_INPUT.message, {
        input: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      })
    );
  }
  next();
}
