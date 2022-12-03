import { parseXMLtoJson } from "./utils.js";

export default async function parseResponse(response) {
  const stringData = await response.text();
  return parseXMLtoJson(stringData);
}
