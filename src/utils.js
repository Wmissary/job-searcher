import fs from "node:fs/promises";

import { XMLParser } from "fast-xml-parser";

function parseXMLtoJson(xml) {
  const parser = new XMLParser();
  return parser.parse(xml);
}

async function fileExist(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function readJSONFile() {
  try {
    const data = await fs.readFile("data.json");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error);
  }
}

async function writeJSONFile(data) {
  const json = JSON.stringify(data, undefined, 2);
  try {
    await fs.writeFile("data.json", json);
  } catch (error) {
    throw new Error("Error writing file", error);
  }
}

export { parseXMLtoJson, writeJSONFile, readJSONFile, fileExist };
