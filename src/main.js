import { indeed } from "./provider/indeed.js";
import { getJobsData, checkJobsData, saveJobsData } from "./jobs.js";

const kSetProvider = new Set([indeed]);
const jobs = await getJobsData(kSetProvider, "developpeur", "angouleme");
const newJobs = await checkJobsData(jobs);
await saveJobsData(newJobs);
