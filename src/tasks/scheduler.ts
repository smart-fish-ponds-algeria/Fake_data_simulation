import { GenerateRandomData } from "../utils/randomData";
import fs from "fs/promises";
import path from "path";
import axios, { AxiosResponse } from "axios";
import FormData from "form-data";

// import { BACKEND_URL_CALLBACK } from "consts/basic_url";

const BACKEND_URL_CALLBACK = "http://localhost:8000/measurements";
const FASTAPI_BACKEND_URL_CALLBACK = "http://localhost:8000/test";
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

const DUMMY_DATA_PATH: string = "src/dummy_image_dataset";

export async function sendRandomImageScheduler() {
  const imageFiles: string[] = await fs.readdir(DUMMY_DATA_PATH);
  const randomIndex: number = Math.floor(Math.random() * imageFiles.length);
  const randomImage: string = imageFiles[randomIndex];
  const imagePath: string = path.join(DUMMY_DATA_PATH, randomImage);
  console.log("imagePath : ", imagePath);

  const imageBuffer: Buffer = await fs.readFile(imagePath);

  const form = new FormData();
  form.append("file", imageBuffer, {
    filename: randomImage,
    contentType: `image/${path.extname(randomImage).slice(1).toLowerCase()}`,
  });

  await axios.post(FASTAPI_BACKEND_URL_CALLBACK, form, {
    headers: form.getHeaders(),
  });
  return;
}
