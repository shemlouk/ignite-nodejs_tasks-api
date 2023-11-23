import { parse } from "csv-parse";
import fs from "fs";

const PATH_TO_FILE = new URL("data.csv", import.meta.url);
const API_URL = "http://localhost:3333/tasks";

/*
  Run 'npm run upload-csv' command to execute this script
*/

(async function uploadCSVData() {
  const file = fs.createReadStream(PATH_TO_FILE, "utf-8");
  const parser = file.pipe(parse());

  let count = 0;
  for await (const record of parser) {
    if (!count++) continue;

    const [title, description] = record;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    }).then(() => {
      console.log(`${count - 1} - ${title} CREATED!`);
    });
  }
})();
