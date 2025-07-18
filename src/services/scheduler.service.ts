import fs from "fs/promises";
import path from "path";
import axios from "axios";
import FormData from "form-data";

export async function selectRandomImage(imagesPath: string, endpoint: string) {
  const imageFiles: string[] = await fs.readdir(imagesPath);
  const randomIndex: number = Math.floor(Math.random() * imageFiles.length);
  const randomImage: string = imageFiles[randomIndex];
  const imagePath: string = path.join(imagesPath, randomImage);
  console.log("imagePath : ", imagePath);

  const imageBuffer: Buffer = await fs.readFile(imagePath);
  const form = new FormData();
  form.append("image", imageBuffer, {
    filename: randomImage,
    contentType: `image/${path.extname(randomImage).slice(1).toLowerCase()}`,
  });

  const response = await axios.post(endpoint, form, {
    headers: form.getHeaders(),
  });

  return response;
}
