import { GenerateRandomData } from "../utils/randomData";
import axios from "axios";
import { BACK_END_URL, FastApi_BACK_EN_URL } from "../config/CheckableEnv";
import { ExpressApiRoutes, FastApiRoutes } from "../route.enum";
import { selectRandomImage } from "../services/scheduler.service";
const DUMMY_DATA_WEIGHT_PATH: string = "src/dummy_image_data/weight_images";
const DUMMY_DATA_DISEASE_PATH: string = "src/dummy_image_data/disease_images";
// const DUMMY_DATA_VIDEO: string = "src/dummy_data_video";

export async function sendingDatScheduler() {
  try {
    const RandomData = await GenerateRandomData();
    try {
      const url = `${BACK_END_URL}/${ExpressApiRoutes.Measure}`;
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

// TODO Add database check to check if there is already a instance running
export async function sendRandomImageScheduler() {
  const weightResponse = await selectRandomImage(
    DUMMY_DATA_WEIGHT_PATH,
    `${FastApi_BACK_EN_URL}/${FastApiRoutes.WEIGHT_ENDPOINT}`
  );

  const weight = weightResponse.data.weight;
  console.log("after weight : ", weight);
  const diseaseResponse = await selectRandomImage(
    DUMMY_DATA_DISEASE_PATH,
    `${FastApi_BACK_EN_URL}/${FastApiRoutes.DISEASE_ENDPOINT}`
  );
  const isSick = diseaseResponse.data.isSick;
  console.log("after isSick : ", isSick);
  const waterTanksRes = await axios.get(
    `${BACK_END_URL}/${ExpressApiRoutes.GET_WATER_TANK}`
  );

  const tanks_ids = waterTanksRes.data.data.map(
    (waterTank: { _id: any }) => waterTank._id
  ) as any[];

  if (tanks_ids.length < 1) return;
  const randomIndex: number = Math.floor(Math.random() * tanks_ids.length);
  const tankId = tanks_ids[randomIndex];
  const url = `${BACK_END_URL}/${ExpressApiRoutes.GET_WATER_TANK}/${tankId}`;
  console.log("url : ", url);

  const res = await axios.put(url, { weight, isSick });
  console.log("Success : ", res);
}

// export async function sendRandomvVideoScheduler() {
//   const form = new FormData();
//   form.append("video", fs.createReadStream(DUMMY_DATA_VIDEO));
//   const url = `${FastApi_BACK_EN_URL}/${FastApiRoutes.WEIGHT_ENDPOINT}`;
//   const response = await axios.post(url, form, {
//     headers: form.getHeaders(),
//   });

//   console.log("Success : ", response);
// }
