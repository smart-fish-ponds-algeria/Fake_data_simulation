import { Response, Request } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import { Read_write_json } from "../utils/JsonHandler";

export const CreateWebhook = async (req: Request, res: Response) => {
  try {
    const { machine, callback_url } = req.body;

    console.log("machine:", machine);
    console.log("callback_url :", callback_url);

    if (
      ![
        "agv_003",
        "cnc_milling_004",
        "leak_test_005",
        "painting_robot_002",
        "stamping_press_001",
        "welding_robot_006",
      ].includes(machine)
    ) {
      return ErrorResponse(res, 400, "Invalid input, machine not avaible");
    }
    const Status = await Read_write_json(
      `src/data/${machine}.json`,
      callback_url
    );

    return SuccessResponse(res, Status.code, Status.message);
  } catch (err: any) {
    console.log("err :", err);

    if (err.response) {
      console.log("err response:", err.response);
      return ErrorResponse(
        res,
        err.response.data.code || 500,
        err.response.data.message || "internal Server Err",
        err.response.data.error || "An error occurred"
      );
    }
    return ErrorResponse(res, err.code, err.message);
  }
};
