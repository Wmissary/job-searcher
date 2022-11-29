import { writeJSONFile, readJSONFile, fileExist } from "./utils.js";
import getJobsData from "./scrap-jobs/index.js";

function filterJobsData(jobs, savedJobs) {
  const newJobs = removeAlreadySavedJobs(jobs, savedJobs);
  const oldJobs = removeExpiredJobs(jobs, savedJobs);
  return {
    newJobs,
    savedJobs: oldJobs,
  };
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
    const data = await readJSONFile(path);
    const { newJobs, savedJobs } = filterJobsData(jobs, data);
    if (newJobs.length > 0) {
      const newJobs = [...newJobs, ...savedJobs];
      await saveJobsData(newJobs, path);
    }
    return { newJobs, savedJobs };
  } else {
    await saveJobsData(jobs, path);
    return { newJobs: jobs, savedJobs: [] };
  }
}

export default updateJobsData;
export { filterJobsData, removeAlreadySavedJobs, removeExpiredJobs };
