import { writeJSONFile, readJSONFile, fileExist } from "./utils.js";
import getJobsData from "./scrap-jobs/index.js";

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

async function updateJobsData(path) {
  const jobs = await getJobsData("developpeur", "angouleme");
  const jobsDataExist = await fileExist(path);
  if (jobsDataExist) {
    const savedJobs = await readJSONFile(path);
    const difference = jobs.filter((job) => {
      return !savedJobs.some((savedJob) => savedJob.id === job.id);
    });
    if (difference.length > 0) {
      const filteredJobs = filterJobsData(jobs, savedJobs);
      await saveJobsData(filteredJobs, path);
    }
  } else {
    await saveJobsData(jobs, path);
  }
}

export default updateJobsData;
