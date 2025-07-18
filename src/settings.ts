import { exitProcess } from "./utils/Process";
import { ExitCodes } from "./config/Errors";
import { setTimeout } from "timers/promises";
import { InDev } from "./config/Env";
import { log } from "./utils/Function";

/**
 * System class for managing application startup and error handling.
 */
export default class System {
	/**
	 * ProcessError method for exiting the application after a specified time.
	 * @param {number} second - The time in seconds after which the process will be terminated.
	 */
	static async ProcessError(second: number) {
		// Timeout exit
		setTimeout(second * 1000).then(() => {
			exitProcess(ExitCodes.ERROR_GENERIC, { error: "Manual termination after timeout" });
		});
	}
}
