import { GenerateRandomData } from "../utils/randomData";
import axios from "axios";
import { BACK_END_URL } from "../config/CheckableEnv";
import { ExpressApiRoutes, FastApiRoutes } from "../route.enum";
import { selectRandomImage } from "../services/scheduler.service";

const DUMMY_DATA_WEIGHT_PATH: string = "src/dummy_image_data/weight_images";
const DUMMY_DATA_DISEASE_PATH: string = "src/dummy_image_data/disease_images";

export async function sendingDatScheduler() {
  try {
    const RandomData = await GenerateRandomData();
    try {
      const url = `${BACK_END_URL}/${ExpressApiRoutes.Measure}`;
      console.log("RandomData : ", RandomData);

      const response = await axios.post(url, RandomData);
      console.log(`Successfully sent data to ${url}`, response.data);
    } catch (err) {
      console.error(`Error sending data :`);
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
    selectRandomImage(DUMMY_DATA_WEIGHT_PATH, FastApiRoutes.WEIGHT_ENDPOINT),
    selectRandomImage(DUMMY_DATA_DISEASE_PATH, FastApiRoutes.DISEASE_ENDPOINT),
  ]);
  return;
}
