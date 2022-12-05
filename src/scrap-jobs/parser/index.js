import { xml } from "./xml.js";

export default async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/rss")) {
    return xml.parseResponse(response);
  }
  throw new Error("Invalid content type");
}
