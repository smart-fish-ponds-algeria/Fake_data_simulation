import axios from "axios";
import { GenerateRandomData } from "../utils/randomData";
// import { BACKEND_URL_CALLBACK } from "consts/basic_url";

const BACKEND_URL_CALLBACK = "http://localhost:8000/measurements";
export async function sendingDatScheduler() {
  try {
    const RandomData = GenerateRandomData();
    try {
      const response = await axios.post(BACKEND_URL_CALLBACK, RandomData);
      console.log(
        `Successfully sent data to ${BACKEND_URL_CALLBACK}`,
        response.data
      );
    } catch (err) {
      console.error(`Error sending data to ${BACKEND_URL_CALLBACK}: ${err}`);
    }

    return;
  } catch (err) {
    const msg = `Error while sending data to servers: ${err}`;
    console.error(msg);
    return msg;
  }
}
