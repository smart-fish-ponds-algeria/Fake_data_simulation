import * as fs from "fs";

export const Read_json = (
  filePath: string
): Promise<{
  code: number;
  message: string;
  data?: {
    callback_url: string;
  }[];
}> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err: any, data: string) => {
      if (err) {
        console.error("Error reading the file:", err);
        return reject({
          code: 500,
          message: "Error reading data",
        });
      }

      try {
        const jsonData = JSON.parse(data);
        console.log("---------------------------------------");
        console.log("Data in ", filePath, " are : ", jsonData);
        console.log("---------------------------------------");
        return resolve({
          code: 200,
          message: "data fetched succesfully",
          data: jsonData,
        });
      } catch (parseErr) {
        console.error("Error parsing Data:", parseErr);
        return reject({
          code: 500,
          message: "Error parsing data",
        });
      }
    });
  });
};

export const Read_write_json = (
  filePath: string,
  callback_url: string
): Promise<{ code: number; message: string }> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err: any, data: string) => {
      if (err) {
        console.error("Error reading data :", err);
        return reject({
          code: 500,
          message: "Error reading data",
        });
      }

      let jsonData = [];

      try {
        jsonData = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON, starting fresh:", parseErr);

        return reject({
          code: 500,
          message: "Error parsing DATA",
        });
      }
      if (jsonData.length > 0) {
        for (let index = 0; index < jsonData.length; index++) {
          const url = jsonData[index].callback_url;

          if (callback_url === url || callback_url === url + "/") {
            return reject({
              code: 400,
              message: "url already subscribe to this machine!",
            });
          }
        }
      }

      jsonData.push({
        callback_url: callback_url,
      });

      fs.writeFile(
        filePath,
        JSON.stringify(jsonData, null, 2),
        (writeErr: any) => {
          if (writeErr) {
            console.error("Error writing to file:", writeErr);
            return reject({
              code: 500,
              message: "Error storing data",
            });
          }
          return resolve({
            code: 201,
            message: "Url stored Successfully!",
          });
        }
      );
    });
  });
};
