import { writeJSONFile } from "./utils.js";

function filterJobsData(jobs, savedJobs) {
  const newJobs = removeAlreadySavedJobs(jobs, savedJobs);
  const oldJobs = removeExpiredJobs(jobs, savedJobs);
  return [...newJobs, ...oldJobs];
}

function removeAlreadySavedJobs(jobs, savedJobs) {
  return jobs.filter((job) => {
    const jobAlreadySaved = savedJobs.find(
      (savedJob) => savedJob.id === job.id
    );
    return !jobAlreadySaved;
  });
}

function removeExpiredJobs(jobs, savedJobs) {
  return savedJobs.filter((savedJob) => {
    return jobs.find((job) => job.id === savedJob.id);
  });
}

async function saveJobsData(jobs, path) {
  try {
    await writeJSONFile(jobs, path);
  } catch (error) {
    throw new Error("Error saving data", error);
  }
}

export { filterJobsData, saveJobsData };
