import { parseXMLtoJson } from "./utils.js";

export default async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/rss")) {
    const stringData = await response.text();
    return parseXMLtoJson(stringData);
  }
  throw new Error("Invalid content type");
}
