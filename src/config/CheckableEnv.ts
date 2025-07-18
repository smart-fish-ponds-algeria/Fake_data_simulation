import { EnvEmitter } from "../utils/Events";
import { exitProcess } from "../utils/Process";
import { log } from "../utils/Function";

import { config } from "dotenv";
import { ExitCodes } from "./Errors";

config();
export function CheckEnv(Env_Field: string, exitCode: ICode) {
  if (!process.env[Env_Field]) {
    log(`🔴 Failed on loading env field => '${Env_Field}'`);
    exitProcess(exitCode, { field: Env_Field });
  }
  log(`🟢 Checking env field => '${Env_Field}' : ${process.env[Env_Field]}`);

  return process.env[Env_Field] as string;
}

// checkable env
log("---------------------------- Necessary ENV ----------------------------");
// export const JWT_SECRET = CheckEnv("BACK_SECRET", ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD);
// export const EmailUser = CheckEnv("BACK_EmailUser", ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD);
// export const EmailPass = CheckEnv("BACK_EmailPass", ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD);
export const IN_PROD = CheckEnv(
  "IN_PROD",
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
);
export const BACK_END_URL = CheckEnv(
  "BACK_END_URL",
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
);

export const FastApi_BACK_EN_URL = CheckEnv(
  "FastApi_BACK_EN_URL",
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
);

log("--------------------------------------------------------\n");
EnvEmitter.emit("loaded");
