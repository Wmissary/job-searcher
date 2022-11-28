import path from "node:path";
import { fileURLToPath } from "node:url";

import getJobsData from "./scrap-jobs/index.js";
import { filterJobsData, saveJobsData } from "./jobs.js";

import { readJSONFile, fileExist } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kPathJobsData = path.join(__dirname, "..", "jobs.json");

const jobs = await getJobsData("developpeur", "angouleme");
const jobsDataExist = await fileExist(kPathJobsData);
if (jobsDataExist) {
  const savedJobs = await readJSONFile(kPathJobsData);
  const difference = jobs.filter((job) => {
    return !savedJobs.some((savedJob) => savedJob.id === job.id);
  });
  if (difference.length > 0) {
    const filteredJobs = filterJobsData(jobs, savedJobs);
    await saveJobsData(filteredJobs, kPathJobsData);
  }
} else {
  await saveJobsData(jobs, kPathJobsData);
}
