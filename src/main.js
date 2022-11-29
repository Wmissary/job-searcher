import path from "node:path";
import { fileURLToPath } from "node:url";

import updateJobsData from "./jobs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kPathJobsData = path.join(__dirname, "..", "jobs.json");
await updateJobsData(kPathJobsData);

const kNumber5minutes = 5 * 60 * 1000;

setInterval(async () => {
  await updateJobsData(kPathJobsData);
}, kNumber5minutes);
