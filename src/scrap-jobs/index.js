import { kSetProvider } from "./provider/index.js";
import { parseXMLtoJson } from "./utils.js";

export default async function getJobsData(name, location) {
  try {
    const data = await Promise.all(
      [...kSetProvider].map(async (provider) => {
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
