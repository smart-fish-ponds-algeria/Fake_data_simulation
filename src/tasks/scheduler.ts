import { GenerateRandomData } from "../utils/randomData";
import axios from "axios";
import { selectRandomImage } from "services/scheduler.service";

const BACKEND_URL_CALLBACK = "http://localhost:8000/measurements";
const FASTAPI_BACKEND_WEIGHT_ENDPOINT = "http://localhost:8000/test";
const FASTAPI_BACKEND_DISEASE_ENDPOINT = "http://localhost:8000/test";

const DUMMY_DATA_WEIGHT_PATH: string = "src/dummy_image_data/weight_images";
const DUMMY_DATA_DISEASE_PATH: string = "src/dummy_image_data/disease_images";

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

export async function sendRandomImageScheduler() {
  await Promise.all([
    selectRandomImage(DUMMY_DATA_WEIGHT_PATH, FASTAPI_BACKEND_WEIGHT_ENDPOINT),
    selectRandomImage(
      DUMMY_DATA_DISEASE_PATH,
      FASTAPI_BACKEND_DISEASE_ENDPOINT
    ),
  ]);
  return;
}
