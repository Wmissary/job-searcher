import {
  fileExist,
  parseXMLtoJson,
  readJSONFile,
  writeJSONFile,
} from "./utils.js";

export async function getJobsData(providers, name, location) {
  try {
    const data = await Promise.all(
      [...providers].map(async (provider) => {
        const url = provider.url(name, location);
        const response = await fetch(url);
        if (response.ok) {
          const stringData = await response.text();
          const data = parseXMLtoJson(stringData);
          console.log(data);
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

export async function checkJobsData(jobs) {
  try {
    if (await fileExist("data.json")) {
      const data = await readJSONFile();
      return jobs.filter((job) => {
        const isJobAlreadySaved = data.some(
          (savedJob) => savedJob.id === job.id
        );
        return !isJobAlreadySaved;
      });
    }
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveJobsData(jobs) {
  try {
    if (await fileExist("data.json")) {
      const data = await readJSONFile();
      const newData = [...data, ...jobs];
      await writeJSONFile(newData);
    } else {
      await writeJSONFile(jobs);
    }
  } catch (error) {
    throw new Error("Error saving data", error);
  }
}
