import { parseXMLtoJson, writeJSONFile } from "./utils.js";

async function getJobsData(providers, name, location) {
  try {
    const data = await Promise.all(
      [...providers].map(async (provider) => {
        const url = provider.url(name, location);
        const response = await fetch(url);
        if (response.ok) {
          const stringData = await response.text();
          const data = parseXMLtoJson(stringData);
          return provider.transformResponse(data);
        } else {
          return [];
        }
      })
    );
    return data.flat();
  } catch {
    throw new Error("Error fetching data");
  }
}

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

export { getJobsData, filterJobsData, saveJobsData };
