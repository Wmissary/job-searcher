import path from "node:path";

import { kSetProvider } from "./provider/index.js";
import { getJobsData, filterJobsData, saveJobsData } from "./jobs.js";

import { readJSONFile, fileExist, __dirname } from "./utils.js";

const kPathJobsData = path.join(__dirname, "..", "jobs.json");

const jobs = await getJobsData(kSetProvider, "developpeur", "angouleme");
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
